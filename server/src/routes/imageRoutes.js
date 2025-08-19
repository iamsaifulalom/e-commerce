const { Router } = require('express');
const { upload, cloudinary } = require('../config/cloudinary/multer');
const { checkAuth, checkRole } = require('../middleware/checkAuth');

const router = Router()

router.post("/image", checkAuth, checkRole(["admin"]), async (req, res) => {

    upload.single("image")(req, res, function (err) {
        if (err) {
            console.log(err)
            console.log(err.message)
            return res.status(400).json({ error: err.message })
        }

        const { path, filename } = req.file;
        const image = {
            url: path,
            publicId: filename
        };
        res.status(201).json(image);
    })
})

router.post("/images", checkAuth, checkRole(["admin", "seller"]), async (req, res) => {

    upload.array("images")(req, res, function (err) {
        if (err) {
            console.log(err.message)
            return res.status(500).json({ error: err.message })
        }

        const images = req.files.map(file => ({
            url: file.path,
            publicId: file.filename
        }))
        res.status(201).json(images)
    })
})


router.delete("/", checkAuth, checkRole(["admin", "seller"]), async (req, res) => {
    try {
        const { publicId } = req.query;
        console.log(publicId)
        const response = await cloudinary.uploader.destroy(publicId)
        if (response.result === "not found") {
            throw new Error("image not found")
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

module.exports = router;