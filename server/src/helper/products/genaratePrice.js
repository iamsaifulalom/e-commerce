exports.genaratePrice = async function (next) {
    try {
        const update = this.getUpdate();
        const variants = update.variants;
        // 1. Set price from variant
        if (variants?.length > 0) {
            const { salePrice, regularPrice } = variants[0];
            update.price = salePrice ? salePrice : regularPrice;
        }
        this.setUpdate(update);
        next();

    } catch (error) {
        return next(error);
    }
};
