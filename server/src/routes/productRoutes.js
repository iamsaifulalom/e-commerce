require('dotenv').config();
const { Router } = require('express');
const { Product, productValidator } = require('../models/productModle');
const { checkAuth, checkRole } = require('../middleware/checkAuth');
const formataProducts = require('../helper/products/formateProducts');
const { cloudinary } = require('../config/cloudinary/multer');
const { ObjectId } = require("mongoose").Types;
const handleError = require("../helper/common/handleError");
const { getCategoryWithChildrenIds } = require('../helper/products/getCategoryWithChildrenIds');
const { saveSearchTerm } = require('../helper/products/saveSearchTerm');
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60 * 10 })

const router = Router()

//create produtc only admin
router.post("/", checkAuth, checkRole(["admin", "seller"]), async (req, res) => {

    try {

        const productData = req.body;
        const productDataWithSellerData = { ...productData, seller: req.user._id };

        const { error, value } = productValidator.validate(productDataWithSellerData)
        if (error) {
            return res.status(400).json({ error: error.message })
        }
        const newProduct = new Product(value)
        await newProduct.save()
        res.status(201).json({ message: "Product created successfully" })

    } catch (error) {

        handleError(error, res)
    }
})

// get all products
router.get("/", async (req, res) => {
    try {
        const {
            page,
            limit,
            q,
            category,
            excludeProduct,
            filter
        } = req.query;



        const filterStr = JSON.stringify(filter);
        const cacheKey = `products:${page}-${limit}-${q}-${category}-${filterStr}`;

        const cachedProducts = cache.get(cacheKey);

        if (cachedProducts) {
            return res.status(200).json(cachedProducts); // return the cached data
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;

        const filterObj = {};
        const sortObj = {}

        // check search query if available ,
        // then find match in title ,keywords and descriptions
        if (q) {
            const regex = new RegExp(q, 'i');
            filterObj["$or"] = [
                { title: regex },
                { description: regex },
                { keywords: regex },
            ];
            // this funtions is for tracking customer search 
            // if they found products or not with their desire search term
            await saveSearchTerm(q);
        }



        // get stock out products
        if (filter === "stockOut") filterObj["variants.stock"] = 0;
        if (filter === "heighPrice") sortObj.price = -1;
        if (filter === "lowPrice") sortObj.price = 1;
        if (filter === "newProducts") sortObj.updatedAt = -1;
        if (filter === "oldProducts") sortObj.updatedAt = 1;


        // check category id if available then match similar categorized products
        if (category) {
            const catArray = await getCategoryWithChildrenIds(category);
            if (catArray.length) {
                filterObj.category = { $in: catArray };
            }
        }

        // exclude product
        if (excludeProduct && ObjectId.isValid(excludeProduct)) {
            filterObj._id = { $ne: new ObjectId(excludeProduct) };
        }

        // paginations
        const skip = (pageNum - 1) * limitNum;

        const rawProducts = await Product.find(filterObj)
            .skip(skip)
            .sort(sortObj)
            .lean()
            .limit(limitNum);

        const products = await formataProducts(rawProducts);
        const hasMore = products?.length === limitNum;

        cache.set(cacheKey, { products, hasMore });

        res.status(200).json({ products, hasMore: hasMore });
    } catch (error) {
        handleError(error, res)
    }
})

router.get("/seller", checkAuth, checkRole(["seller", "admin"]), async (req, res) => {
    try {
        const limitNum = 10
        const isSeller = req.user.role === "seller";
        const { q, filter, page } = req.query;

        const pageNum = parseInt(page) || 1;
        const filterObj = {};
        const sortObj = {}

        // check search query if available ,
        // then find match in title ,keywords and descriptions
        if (q) {
            const regex = new RegExp(q, 'i');
            filterObj["$or"] = [
                { title: regex },
                { description: regex },
                { keywords: regex },
            ];
        }

        if (isSeller) filterObj["seller"] = req?.user?._id
        if (filter && filter === "stockOut") filterObj["variants.stock"] = 0;
        if (filter && filter === "bestSelling") sortObj["sold"] = -1;
        sortObj["updatedAt"] = - 1
        // paginations
        const skip = (pageNum - 1) * limitNum;

        const rawProducts = await Product.find(filterObj)
            .skip(skip)
            .sort(sortObj)
            .limit(limitNum);

        const products = await formataProducts(rawProducts);
        const hasMore = products?.length === limitNum;

        res.status(200).json({ products, hasMore: hasMore });
    } catch (error) {
        handleError(error, res)
    }
})

// get by id (product)
router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
            .select("-__v -updatedAt -createdAt -sold")
            .populate({ path: "category", select: "_id name" })
        if(!product) return res.status(404).json({error: "Product not found"})
        res.status(200).json(product)
    } catch (error) {
        handleError(error, res)
    }
})

// delete product only admin
router.delete("/:id", checkAuth, checkRole(["admin", "seller"]), async (req, res) => {
    try {

        const productId = req.params.id;
        const sellerId = req.user._id;
        let productFilter = {}

        if (req.user.role !== "admin") {
            productFilter = {
                _id: productId,
                seller: sellerId
            }
        }

        const result = await Product.findOne(productFilter)
            .select("images -_id");

        if (!result) throw new Error("No product to delete");

        const { images } = result;

        const promises = images.map(({ publicId }) => {
            return cloudinary.uploader.destroy(publicId)
        })

        await Promise.all(promises)
        await Product.findOneAndDelete(productFilter)
        res.status(200).json({ message: "Product deleted successfully." })
    } catch (error) {
        handleError(error, res)
    }
})

// update product only admin
router.put("/", checkAuth, checkRole(["admin", "seller"]), async (req, res) => {
    try {
        const { _id, ...product } = req.body;

        if (!_id) throw new Error("Product id is required to update")

        if (req.user.role !== "admin") {
            const isAuthorized = await Product.findOne({ _id: _id, seller: req.user._id })
            if (!isAuthorized) throw new Error("You are not authorized to update this product")
        }

        // Proceed to update the product
        const { error, value } = productValidator.validate(product)
        if (error) throw new Error(error.message)

        await Product.findByIdAndUpdate(_id, value)
        res.status(200).json({ message: "Product updated" })
    } catch (error) {
        handleError(error, res)
    }
})

module.exports = router;