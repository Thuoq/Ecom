'use strict';
const { model, Schema } = require('mongoose');
const PRODUCT_DOCUMENT_NAME = 'Product';
const PRODUCT_COLLECTION_NAME = 'Products';
const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productThumb: {
            type: String,
            required: true
        },
        productDescription: {
            type: String,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        productQuantity: {
            type: String,
            required: true
        },
        productType: {
            type: String,
            required: true
        },
        productAttributes: {
            type: Schema.Types.Mixed,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        collection: PRODUCT_COLLECTION_NAME,
        timestamps: true
    }
);

// Clothing Schema
const CLOTHING_COLLECTION_NAME = 'Clothing';
const CLOTHING_DOCUMENT_NAME = 'Clothes';
const clothingSchema = new Schema(
    {
        brand: {
            type: String,
            required: true
        },
        size: String,
        material: String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        collection: CLOTHING_COLLECTION_NAME
    }
);

// define the product type = electronic
const ELECTRONIC_COLLECTION_NAME = 'Electronics';
const ELECTRONIC_DOCUMENT_NAME = 'Electronic';
const electronicSchema = new Schema(
    {
        manufacturer: { type: String, required: true },
        model: String,
        color: String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        collection: ELECTRONIC_COLLECTION_NAME,
        timestamps: true
    }
);

module.exports = {
    product: model(PRODUCT_DOCUMENT_NAME, productSchema),
    electronic: model(ELECTRONIC_DOCUMENT_NAME, electronicSchema),
    clothing: model(CLOTHING_DOCUMENT_NAME, clothingSchema)
};
