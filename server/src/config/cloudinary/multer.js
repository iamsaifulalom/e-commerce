require('dotenv').config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "bazarbhai", // Change folder name as needed
        format: async () => "webp",
        public_id: (_, file) => {
            // Create a unique public_id using the file name and timestamp
            const timestamp = Date.now(); // Timestamp to ensure uniqueness
            const sanitizedFileName = file.originalname.split(".")[0].replace(/[^a-zA-Z0-9]/g, "_"); // Remove non-alphanumeric characters
            return `${sanitizedFileName}_${timestamp}`; 
        },
    },
})


const upload = multer({ storage: storage })

module.exports = { upload, cloudinary };