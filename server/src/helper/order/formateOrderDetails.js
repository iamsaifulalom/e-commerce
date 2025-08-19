const getLocalData = require('../common/data');

async function formateOrderDetails(order) {

    // here this map mathod is for modifing cart's item
    const cart = order?.cart?.map((item) => {
        const { images = [], title = "null", _id = "", variants = [], seller = {} } = item?._id || {};
        const { size = "null", colour = "null", quantity = 1 } = item;
        const { regularPrice = 0, salePrice = 0 } = variants.find(v => v.size === size) || {}

        const totalPrice = (salePrice ? salePrice : regularPrice) * quantity
        const modifiedItem = {
            _id: _id.toString(),
            image: images?.[0]?.url || "no image",
            title,
            size,
            colour,
            quantity,
            totalPrice,
            seller
        }

        return modifiedItem
    })

    // calculate total products cost to calculate shiping fees
    const productCost = cart.reduce((acc, item) => acc + item?.totalPrice, 0)

    const orderDetails = {
        _id: order?.orderId,
        createdAt: getLocalData(order?.createdAt),
        paymentStatus: order?.paymentStatus,
        orderStatus: order?.orderStatus,
        deliveryType: order?.deliveryType,
        shippingAddress: order?.shippingAddress,
        totalCost: order?.totalCost,
        deliveryFees: order?.totalCost - productCost,
        cart,
        customer: order?.customer || "not found",
        paymentMethod : order?.paymentMethod || "not found"
    }
    return orderDetails
}

module.exports = formateOrderDetails;