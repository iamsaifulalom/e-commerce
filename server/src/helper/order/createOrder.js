const { Order } = require("../../models/orderModel");

async function createOrder(orderData) {
    // console.log(orderData)
    const orderState = {}
    try {
        const order = new Order(orderData)
        const savedOrder = await order.save()
        orderState.value = savedOrder;
        orderState.error = null
    } catch (error) {
        orderState.value = null;
        orderState.error = error
    }
    return orderState
}

module.exports = { createOrder };