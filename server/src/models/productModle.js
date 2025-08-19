const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { genaratePrice } = require('../helper/products/genaratePrice');

const variantSchema = new Schema({
    size: { type: String, required: true },
    colour: { type: String, required: false },
    stock: { type: Number, required: true },
    weight: { type: Number, required: true },
    regularPrice: { type: Number, required: true },
    salePrice: { type: Number, required: false },
}, { _id: false });

const imageSchema = new Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true },
}, { _id: false });

const productSchema = new Schema({
    title: { type: String, required: true },
    keywords: { type: String, required: true },
    isFeatured: { type: String, enum: ['yes', 'no'], default: 'no' },
    description: { type: String },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    sold: { type: Number, required: false, default: 0 },
    price: { type: Number },
    variants: [variantSchema],
    images: [imageSchema],
}, {
    timestamps: true
});

// hook to genareate price and keywords
productSchema.pre("save", async function (next) {
    try {

        // 1. Set default price from first variant
        const { salePrice, regularPrice } = this.variants[0];
        this.price = salePrice ? salePrice : regularPrice;
        
        next(); // Always call next
    } catch (error) {
        next(error); // Pass error to middleware if anything fails
    }
});

// hook to genareate price and keywords
productSchema.pre("findOneAndUpdate", genaratePrice);


const Product = model("Product", productSchema)


/*=====================================
joi validataor
=======================================*/

const productValidator = Joi.object({
    title: Joi.string().required(),
    keywords: Joi.string().allow(''),
    isFeatured: Joi.string().valid('yes', 'no').default('no'),
    description: Joi.string().required(),
    seller: Joi.string().required(),
    price: Joi.number().optional(),
    category: Joi.alternatives().try(
        // first check if it is string during create product
        Joi.string().hex().length(24).required(),
        // second check if it is obj during update product
        Joi.object({
            _id: Joi.string().hex().length(24).required(),
            name: Joi.string().required(),
        })
    )
    ,
    variants: Joi.array().items(
        Joi.object({
            size: Joi.string().required(),
            colour: Joi.string().optional().allow(""),
            stock: Joi.number().required(),
            weight: Joi.number().required(),
            regularPrice: Joi.number().required(),
            salePrice: Joi.number().optional()
        })
    ).min(1).required(),
    images: Joi.array().items(
        Joi.object({
            url: Joi.string().uri().required(),
            publicId: Joi.string().required()
        })
    ).min(1).required()
})

module.exports = { Product, productValidator };