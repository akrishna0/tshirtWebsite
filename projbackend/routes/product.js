const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")
const {getProductById, createProduct} = require("../controllers/product")

// PARAMETERS
router.param("userId", getUserById);
router.param("productId", getProductById);

// ACTUAL ROUTES
router.post("/product/create/:userId",isSignedIn, isAuthenticated, isAdmin, createProduct);
module.exports = router;