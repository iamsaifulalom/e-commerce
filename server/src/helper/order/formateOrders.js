const getLocalDate = require("../common/data");

async function formateOrders(ordersData) {

    const orders = ordersData.map(order => {
        const orderImage = order?.cart?.[0]?._id?.images?.[0].url;
        return {
            _id: order?.orderId,
            createdAt: getLocalDate(order?.createdAt),
            image: orderImage,
            orderStatus: order?.orderStatus,
            paymentStatus: order?.paymentStatus,

        }
    })

    return orders
}

module.exports = formateOrders;