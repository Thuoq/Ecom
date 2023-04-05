const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helpers');
const { checkAuthentication } = require('../../auth/checkAuth');
// SEARCH //
router.get('', asyncHandler(productController.searchProductsByUser));

// END SEARCH //
router.use(checkAuthentication);
router.post('', asyncHandler(productController.createProduct));
router.put('/publish/:id', asyncHandler(productController.publishProductByOwner));
router.put('/unpublish/:id', asyncHandler(productController.unPublishProductByOwner));

// QUERY //
router.get('/drafts/all', asyncHandler(productController.getAllDraftForOwner));
router.get('/publishes/all', asyncHandler(productController.getAllPublishForOwner));
module.exports = router;
