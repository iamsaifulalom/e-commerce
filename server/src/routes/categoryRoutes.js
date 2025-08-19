const { Router } = require('express');
const { Category, categoryValidationSchema } = require('../models/categoryModel');
const { checkRole, checkAuth } = require('../middleware/checkAuth');
const handleError = require("../helper/common/handleError");
const axios = require("axios");
const { cloudinary } = require('../config/cloudinary/multer');

const router = Router()


// get categories by filter

router.get("/by-filter", async (req, res) => {
    try {
        const categoryType = req.query?.categoryType;
        const parentId = req.query?.parentId;


        const filter = {};

        if (parentId) {
            filter.parent = parentId;
        } else {
            if (categoryType === "Parent") filter.parent = null
            if (categoryType === "Child") filter.parent = { $ne: null }
        }

        const categories = await Category.find(filter)
            .select("name description isPromoted image  parent")
        res.status(200).json(categories)
    } catch (error) {
        handleError(error, res)
    }
})

// create a catergory 
router.post("/", checkAuth, checkRole(["admin"]), async (req, res) => {
    try {
        const { error, value } = categoryValidationSchema.validate(req.body)


        if (error) return res.status(400).json({
            error: error?.message
        })

        if (value) {
            const newCategory = new Category(value)
            await newCategory.save()
            res.status(201).json({ message: "Category created successfully" })
        }
    } catch (error) {
        console.log("erro while creating a new category at /api/categoris", err.messaga)
        res.status(500).json({ error: err.message })
    }
})

// get all parents category
router.get("/", async (_, res) => {
    try {
        const categories = await Category.find({ parent: null })
            .sort({ createdAt: -1 }).select("name image _id")
        res.status(200).json(categories)
    } catch (err) {
        console.log("erro while featchin parant categoris at /api/categoris", err.messaga)
        res.status(500).json({ error: err.message })
    }
})

// get childe categories with parents
router.get("/child-categories", async (req, res) => {
    try {
        const { parent } = req.query;
        if (!parent) return res.status(200).json([{ _id: "", name: "No child found" }])

        const data = await Category.find({ parent }).select("image name _id description")
        if (data.length < 0) return res.status(200).json([{ _id: "", name: "No child found" }])
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        console.log("erro while featchin child categoris at /api/categoris/childcategories", err.messaga)
        res.status(500).json({ error: err.message })
    }
})

// delete a category
router.delete("/:id", checkAuth, checkRole(["admin"]), async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Category id required");

        const categories = await Category.find({
            $or: [{ _id: id }, { parent: id }]
        });

        // Delete images from Cloudinary
        const deletionPromises = categories.map((cat) => {
            console.log(req.user)
            const publicId = cat.image.publicId;
            return  cloudinary.uploader.destroy(publicId);
        });

        await Promise.all(deletionPromises);

        // Now delete the categories from the database
        await Category.deleteMany({
            $or: [{ _id: id }, { parent: id }]
        });

        res.status(200).json({ message: "Categories and images deleted successfully" });
    } catch (err) {
        console.log("Error while deleting categories:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// get category by id
router.get("/by-id/:id", checkAuth, checkRole(["admin"]), async (req, res) => {
    try {
        const { id } = req.params
        const response = await Category.findById(id).select("-__v")
            .populate({ path: "parent", select: "name _id" })
        res.status(200).json(response)
    } catch (err) {
        console.log("Error while deleting categories:", err.message);
        res.status(500).json({ error: err.message });
    }
})

// update a category
router.put("/", checkAuth, checkRole(["admin"]), async (req, res) => {
    try {
        const { _id, ...body } = req.body;


        if (!_id) {
            return res.status(400).json({ message: "_id is required" });
        }

        const result = await Category.findByIdAndUpdate(_id, body, { new: true });
        if (!result) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated", data: result });
    } catch (err) {
        console.log("Error while updating category:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;