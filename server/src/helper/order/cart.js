const { Product } = require("../../models/productModle");

const processCartItem = async (item, i) => {

    const product = await Product.findById(item?._id);
    if (!product) throw new Error(`কার্টের ${i + 1} নাম্বার প্রডাক্ট আমাদের কাছে এখন নেই।`);

    const variant = product.variants.find(v => v?.size === item?.size);
    if (!variant) throw new Error(`${product.title} এর ${item?.size} ভ্যরিয়ান্ট নেই।`);

    const isOutOfStock = variant.stock === 0
    if (isOutOfStock) throw new Error(`${product.title} স্টকে নেই ।`);

    const isMoreWant = variant.stock < item.quantity;
    if (isMoreWant) throw new Error(`${product.title} স্টকে আছে ${variant.stock}`);

    variant.stock -= item.quantity;
    product.sold += item.quantity;
    await product.save();

    const totalWeight = (variant.weight * item.quantity) / 1000;
    const productPrice = variant.salePrice ? variant.salePrice : variant.regularPrice;
    const totalPrice = productPrice * item.quantity;
    return { totalPrice, totalWeight };
};

function calculateDeliveryCost(kg) {

    if (kg <= 5) {
        return 30;
    } else if (kg <= 10) {
        return 40;
    } else if (kg <= 20) {
        return 60;
    } else if (kg <= 30) {
        return 80;
    } else if (kg <= 50) {
        return 100;
    } else {
        return 120;
    }
}



module.exports = { processCartItem, calculateDeliveryCost };
