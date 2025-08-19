const { Schema, model, models } = require('mongoose');
const Joi = require('joi');
const { customAlphabet } = require("nanoid")
const nanoid = customAlphabet("0123456789", 6)
// --- Mongoose Schemas ---

const cartItemSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    size: { type: String, required: true },
    colour: { type: String },
    quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const shippingAddressSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    secondPhoneNumber: { type: String, required: false },
    fullAddress: { type: String, required: true },
    area: { type: String, required: true },
    village: { type: String, required: true },
}, { _id: false });


const orderSchema = new Schema({
    orderId: { type: String, unique: true },
    cart: { type: [cartItemSchema], required: true },
    shippingAddress: { type: shippingAddressSchema, required: true },
    deliveryType: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    totalCost: { type: Number, required: true },
    orderStatus: {
        type: String,
        enum: ["Pending", "Completed", "Delivered", "Cancelled", "Received"],
        default: "Pending"
    },
    paymentMethod: { type: String, default: "ক্যাশ অন ডেলিভারি (COD)" },
}, { timestamps: true });


orderSchema.pre("save", async function (next) {
    if (!this.orderId) {
        let isUnique = false;
        while (!isUnique) {
            const id = nanoid();
            const exists = await models.Order.findOne({ orderId: id });
            if (!exists) {
                this.orderId = id;
                isUnique = true;
            }
        }
    }

    next();
});


const Order = model('Order', orderSchema);

// --- Joi Validation ---

const validateOrder = Joi.object({
    cart: Joi.array().items(
        Joi.object({
            _id: Joi.string().required(),
            size: Joi.string().required().messages({
                "string.empty": "পণ্যের সাইজ নির্বাচন করুন।"
            }),
            colour: Joi.string().allow(""),
            quantity: Joi.number().integer().min(1).required().messages({
                "number.base": "পরিমাণ অবশ্যই একটি সংখ্যা হতে হবে।",
                "number.min": "পরিমাণ কমপক্ষে ১ হতে হবে।",
                "any.required": "পণ্যের পরিমাণ প্রদান করুন।"
            })
        })
    ).min(1).required().messages({
        "array.min": "অন্তত একটি পণ্য যুক্ত করুন।",
        "array.base": "কার্টে পণ্যের তথ্য প্রদান করুন।"
    }),

    shippingAddress: Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "অনুগ্রহ করে আপনার নাম প্রদান করুন।",
            "string.base": "অনুগ্রহ করে আপনার নাম প্রদান করুন।",
            "any.required": "অনুগ্রহ করে আপনার নাম প্রদান করুন।",
        }),
        phoneNumber: Joi.string().required().messages({
            "string.empty": "অনুগ্রহ করে আপনার ফোন নম্বর প্রদান করুন।",
            "string.base": "অনুগ্রহ করে আপনার ফোন নম্বর প্রদান করুন।",
            "any.required": "অনুগ্রহ করে আপনার ফোন নম্বর প্রদান করুন।",
        }),
        secondPhoneNumber: Joi.string().optional().allow(""),
        area: Joi.string().required().messages({
            "string.empty": "অনুগ্রহ করে  এরিয়া সিলেক্ট  করুন।",
            "string.base": "অনুগ্রহ করে  এরিয়া সিলেক্ট  করুন।",
            "any.required": "অনুগ্রহ করে  এরিয়া সিলেক্ট  করুন।"
        }),
        village: Joi.string().required().messages({
            "string.empty": "অনুগ্রহ করে গ্রামের নাম প্রদান করুন।",
            "string.base": "অনুগ্রহ করে গ্রামের নাম প্রদান করুন।",
            "any.required": "অনুগ্রহ করে গ্রামের নাম প্রদান করুন।"
        }),
        fullAddress: Joi.string().required().messages({
            "string.empty": "অনুগ্রহ করে সম্পূর্ণ ঠিকানা প্রদান করুন।",
            "string.base": "অনুগ্রহ করে সম্পূর্ণ ঠিকানা প্রদান করুন।",
            "any.required": "অনুগ্রহ করে সম্পূর্ণ ঠিকানা প্রদান করুন।"
        }),
    }).required(),

    deliveryOption: Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "ডেলিভারি অপশন নির্বাচন করুন।"
        }),
        cost: Joi.number().min(0).required().messages({
            "number.base": "ডেলিভারি খরচ একটি সংখ্যা হতে হবে।",
            "number.min": "ডেলিভারি খরচ শূন্য বা তার বেশি হতে হবে।"
        }),
        duration: Joi.string().required().messages({
            "string.empty": "ডেলিভারি সময়কাল প্রদান করুন।"
        }),
    }).required(),
});

module.exports = { Order, validateOrder };


