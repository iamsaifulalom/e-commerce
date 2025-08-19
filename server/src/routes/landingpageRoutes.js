const NodeCache = require("node-cache")
const { Router } = require('express');
const { Category } = require('../models/categoryModel');
const { Product } = require('../models/productModle');
const formateProducts = require('../helper/products/formateProducts');
const handleError = require('../helper/common/handleError');


const cache = new NodeCache({ stdTTL: 60 * 5 });

const router = Router()

router.get("/", async (_, res) => {
    try {

        const cached = cache.get("landing-page");
        if (cached) return res.status(200).json(cached);

        let data = {}
        // categories
        const categories = await Category.find({ parent: null }).select("_id name image").lean();
        data.categories = categories

        // promoted category
        const promotedCategory = await Category
            .findOne({ isPromoted: "yes", parent: null })
            .select("_id name image description").lean();
        data.promotedCategory = promotedCategory

        //new arrivals
        const newArrivals = await Product.find().sort({ updatedAt: -1 }).limit(14).lean();;
        data.newArrivals = await formateProducts(newArrivals)

        // best selling
        const bestSaling = await Product.find({}).sort({ sold: -1 }).limit(14).lean();
        data.bestSaling = await formateProducts(bestSaling)

        cache.set("landing-page", data)
        res.status(200).json(data)
    } catch (error) {
        handleError(error, res)
    }
})


module.exports = router;