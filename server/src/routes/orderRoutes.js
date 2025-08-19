const { Router } = require('express');
const { checkAuth, checkRole } = require('../middleware/checkAuth');
const { validateOrder, Order } = require('../models/orderModel');
const handleError = require('../helper/common/handleError');
const { processCartItem, calculateDeliveryCost } = require('../helper/order/cart');
const { createOrder } = require('../helper/order/createOrder');
const formateOrders = require('../helper/order/formateOrders');
const formateOrderDetails = require('../helper/order/formateOrderDetails');
const { Product } = require('../models/productModle');

const router = Router()

// order route only authenticate users/customer can place order
router.post("/", checkAuth, async (req, res) => {
    try {

        const { cart, shippingAddress, deliveryOption } = req.body;
        // validata data 
        const { error, value } = validateOrder.validate({ cart, shippingAddress, deliveryOption })
        if (error) return res.status(400).json({ error: error.message })

        // find individual product and return total price and weight
        const cartItemPromises = value.cart?.map(processCartItem);
        const modifiedCartItems = await Promise.all(cartItemPromises);

        // calculate total weignt and price for all products and 
        const totalPrice = modifiedCartItems.reduce((acc, item) => acc + item?.totalPrice, 0)
        const totalWeight = modifiedCartItems.reduce((acc, item) => acc + item?.totalWeight, 0)

        // check delivery option if it is exprss return 30 taka extra
        const deliveryType = deliveryOption.name === "এক্সপ্রেস" ? 20 : 0;

        // calculate delivery cost from total weight
        const deliveryCost = calculateDeliveryCost(totalWeight) + deliveryType

        // calculate grand total with delivery cost 
        const totalCost = totalPrice + deliveryCost;

        const orderData = {
            cart,
            deliveryType: deliveryOption.name,
            shippingAddress,
            totalCost,
            customer: req.user._id,
        }

        // create order
        const orderState = await createOrder(orderData);
        // if anything wrong during palacing order reture error
        if (orderState.error) return res.status(400)
            .json({ error: orderState.error.message });

        res.status(201).json({ orderId: orderState.value.orderId });
    } catch (error) {
        handleError(error, res)
    }
})

// get order by id
// only authenticated user
router.get("/:orderId", checkAuth, async (req, res) => {

    try {
        const { orderId } = req.params;
        const isAdmin = req.user.role === "admin";

        let populateSeller = null
        let populateCustomer = null

        if (isAdmin) {
            populateSeller = {
                path: "seller",
                select: "name phoneNumber"
            };
            populateCustomer = {
                path: "customer",
                select: "name phoneNumber"
            }
        }

        const order = await Order.findOne({ orderId }).populate({
            path: "cart._id",
            select: isAdmin ? "images title variants seller" : "images title variants",
            populate: populateSeller
        }).populate(populateCustomer)

        const orderDetails = await formateOrderDetails(order)
        res.status(200).json(orderDetails)
    } catch (error) {
        handleError(error, res)
    }
})

// all orders with pagintions
// only authenticate user
router.get("/", checkAuth, async (req, res) => {
    try {

        const filter = {}

        let page = parseInt(req.query?.page);
        const limit = 5
        const orderStatus = req.query?.orderStatus;
        const orderId = req.query?.orderId;
        const userId = req.user._id;
        const userRole = req.user.role;

        if (isNaN(page) || page < 1) page = 1;

        if (orderId) {
            filter.orderId = orderId;
        } else {
            if (orderStatus) filter.orderStatus = orderStatus?.trim();
        }
        if (userRole === "customer") filter.customer = userId

        const rawOrders = await Order.find(filter)
            .limit(limit).skip(limit * (page - 1))
            .sort({ createdAt: -1 })
            .select("_id cart createdAt orderStatus paymentStatus orderId")
            .populate({
                path: "cart._id",
                selecet: "images"
            })

        const orders = await formateOrders(rawOrders);
        const hasMore = orders.length === limit;
        res.status(200).json({ orders, hasMore })
    } catch (error) {
        handleError(error, res)
    }
})


// update order state 
// only admin
router.put("/", checkAuth, checkRole(["admin"]), async (req, res) => {
    try {
        const { _id, orderStatus } = req.body;
        const updatedOrder = await Order
            .findOneAndUpdate(
                { orderId: _id },
                { orderStatus },
                { new: true }
            );

        res.status(200).json({ message: `${updatedOrder.orderStatus}` })

        const isCancelled = orderStatus === "বাতিল করা হয়েছে";

        if (isCancelled) {
            console.log(isCancelled)
            const { cart = [] } = await Order.findOne({ orderId: _id, orderStatus });

            for (const item of cart) {
                const productId = item?._id?.toString(); // Product ID
                const { size, colour, quantity } = item;

                const product = await Product.findById(productId);

                if (!product) continue;

                // Find the matching variant
                const variant = product.variants.find(v =>
                    v.size === size && v.colour === colour
                );

                if (!variant) continue;
                // increas stock and update sold count
                variant.stock += quantity;
                if (product.sold > quantity) product.sold -= quantity;

                // Save the updated product
                await product.save();
            }
        }

    } catch (error) {
        handleError(error, res)
    }
})


module.exports = router;