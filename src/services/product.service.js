'use strict';
const { product, clothing, electronic, furniture } = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');
class ProductFactory {
    /*
     * type: 'Clothing'
     * payload: data
     * */
    static async createProduct(type, payload) {
        // start transaction

        const productClass = ProductFactory.productRegistry[type?.toUpperCase()];
        if (!productClass) throw new BadRequestError(`Invalid Product types ${type}`);
        return await new productClass(payload).createProduct();
    }
    static productRegistry = {}; // key-class

    static registerProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef;
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
class Furniture extends Product {
    async createProduct() {
        const newElectronic = await furniture.create({
            ...this.productAttributes,
            owner: this.owner
        });
        if (!newElectronic) throw new BadRequestError('Create new Electronic error !!');
        const newProduct = super.createProduct(newElectronic._id);
        if (!newProduct) throw new BadRequestError('Create new Product error !!');
        return newProduct;
    }
}
const TYPE_PRODUCT = {
    CLOTHING: Clothing,
    ELECTRONIC: Electronic,
    FURNITURE: Furniture
};
// register product types
for (const type in TYPE_PRODUCT) {
    ProductFactory.registerProductType(type, TYPE_PRODUCT[type]);
}

module.exports = ProductFactory;
