const { OK } = require('../core/success.response');
const ProductService = require('../services/product.service');
class ProductController {
    createProduct = async (req, res, next) => {
        new OK({
            message: 'Create Product Success',
            metadata: await ProductService.createProduct(req.body.productType, {
                ...req.body,
                owner: req.user.userId
            })
        }).send(res);
    };

    // PUT //
    publishProductByOwner = async (req, res) => {
        const ownerId = req.user.userId;
        const productId = req.params.id;
        new OK({
            message: 'Publish Product Success',
            metadata: await ProductService.publishProductByOwner({
                ownerId,
                productId
            })
        }).send(res);
    };

    unPublishProductByOwner = async (req, res) => {
        const ownerId = req.user.userId;
        const productId = req.params.id;
        new OK({
            message: 'Publish Product Success',
            metadata: await ProductService.unPublishProductByOwner({
                ownerId,
                productId
            })
        }).send(res);
    };
    // QUERY //
    getAllDraftForOwner = async (req, res) => {
        const ownerId = req.user.userId;
        new OK({
            message: 'GET LIST PRODUCT SUCCESS',
            metadata: await ProductService.findAllDraftsForOwner({
                ownerId
            })
        }).send(res);
    };
    getAllPublishForOwner = async (req, res) => {
        const ownerId = req.user.userId;
        new OK({
            message: 'GET LIST PRODUCT SUCCESS',
            metadata: await ProductService.findAllPublishForOwner({
                ownerId
            })
        }).send(res);
    };
    // END //

    searchProductsByUser = async (req, res) => {
        const { keySearch } = req.query;
        new OK({
            message: 'Search Products Success',
            metadata: await ProductService.searchProductsByUser({ keySearch })
        }).send(res);
    };
}
module.exports = new ProductController();
