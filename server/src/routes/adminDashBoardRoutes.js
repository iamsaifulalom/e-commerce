const { Router } = require('express');
const { Category } = require('../models/categoryModel');
const { Order } = require('../models/orderModel');
const { Product } = require('../models/productModle');
const User = require('../models/userModel');
const { checkAuth, checkRole } = require('../middleware/checkAuth');
const handleError = require('../helper/common/handleError');


const router = Router()

router.get("/", checkAuth, checkRole(["admin", "seller"]), async (req, res) => {
    try {

        const obj = {}
        const isSeller = req.user.role === "seller";
        const filterObj = {}

        //
        if (isSeller) filterObj.seller = req.user._id
        // stock out products
        const stockOutProducts = await Product
            .find({ ...filterObj, "variants.stock": 0 })
            .countDocuments();
        obj.stockOutProducts = stockOutProducts

        // // total products
        const products = await Product.find(filterObj)
            .countDocuments();
        obj.products = products


        if (!isSeller) {
            // total categories count here
            const categories = await Category.countDocuments()
            obj.categories = categories;

            // // total users in database
            const users = await User.countDocuments()
            obj.users = users

            // // total orders 
            const orders = await Order.countDocuments();
            obj.orders = orders;

            // // total cancelled  orders
            const cancelledOrders = await Order.find({ orderStatus: "Cancelled" }).countDocuments();
            obj.cancelledOrders = cancelledOrders;

            // // total pending  orders
            const pendingdOrders = await Order.find({ orderStatus: "Pending" }).countDocuments();
            obj.pendingOrders = pendingdOrders;

        }
        res.status(200).json(obj)
    } catch (error) {
        handleError(error, res)
    }
})

module.exports = router;