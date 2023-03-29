'use strict';
const { product, clothing, electronic } = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');
const TYPE_PRODUCT = {
    CLOTHING: 'clothing',
    ELECTRONIC: 'electronic'
};
class ProductFactory {
    /*
     * type: 'Clothing'
     * payload: data
     * */
    static async createProduct(type, payload) {
        switch (type) {
            case TYPE_PRODUCT.CLOTHING:
                return await new Clothing(payload).createProduct();
            case TYPE_PRODUCT.ELECTRONIC:
                return await new Electronic(payload).createProduct();
            default:
                throw BadRequestError('Do not find type product');
        }
    }
}

class Product {
    constructor({
        productName,
        productThumb,
        productDescription,
        productPrice,
        productQuantity,
        productType,
        productAttributes,
        owner
    }) {
        this.productName = productName;
        this.productThumb = productThumb;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
        this.productType = productType;
        this.productAttributes = productAttributes;
        this.owner = owner;
    }
    async createProduct(productId) {
        return await product.create({
            ...this,
            _id: productId
        });
    }
}
// defined sub-class for different product type
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.productAttributes,
            owner: this.owner
        });
        if (!newClothing) throw new BadRequestError('Create new Clothing error !!');
        const newProduct = super.createProduct(newClothing._id);
        if (!newProduct) throw new BadRequestError('Create new Product error !!');
        return newProduct;
    }
}
class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronic.create({
            ...this.productAttributes,
            owner: this.owner
        });
        if (!newElectronic) throw new BadRequestError('Create new Electronic error !!');
        const newProduct = super.createProduct(newElectronic._id);
        if (!newProduct) throw new BadRequestError('Create new Product error !!');
        return newProduct;
    }
}
module.exports = ProductFactory;
