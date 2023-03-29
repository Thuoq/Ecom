const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helpers');
const { checkAuthentication } = require('../../auth/checkAuth');
router.use(checkAuthentication);
router.post('/', asyncHandler(productController.createProduct));
module.exports = router;
