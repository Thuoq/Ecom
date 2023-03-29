const { OK } = require('../core/success.response');
const ProductService = require('../services/product.service');
class ProductController {
    createProduct = async (req, res, next) => {
        console.log(req.user);
        new OK({
            message: 'Create Product Success',
            metadata: await ProductService.createProduct(req.body.productType, {
                ...req.body,
                owner: req.user.userId
            })
        }).send(res);
    };
}
module.exports = new ProductController();
