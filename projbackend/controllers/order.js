const {Order , ProductCart} = require("../models/order")
exports.getOrderById = (req, res, next, id) =>{
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) =>{
        if(err) {
            return res.status(400).json({
                error: "No Order found",
            });
        }
        res.order = order;
        next();
    })
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile
}