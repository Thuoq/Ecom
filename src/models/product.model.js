'use strict';
const { model, Schema } = require('mongoose');
const slugify = require('slugify');
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
        productSlug: String,
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
        },
        productRatingAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must above 1.0'],
            max: [5, 'Rating must above 5.0']
        },
        productVariation: { type: Array, default: [] },
        isDraft: { type: Boolean, default: true, index: true, select: false },
        isPublished: { type: Boolean, default: false, index: true, select: false }
    },
    {
        collection: PRODUCT_COLLECTION_NAME,
        timestamps: true
    }
);
// Document middleware. run before .save() before create
// Create index
productSchema.index({
    productName: 'text',
    productDescription: 'text'
});
productSchema.pre('save', function (next) {
    this.productSlug = slugify(this.productName, { lower: true });
    next();
});

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

// define the product type = furniture
const FURNITURE_COLLECTION_NAME = 'Furnitures';
const FURNITURE_DOCUMENT_NAME = 'Furniture';
const furnitureSchema = new Schema(
    {
        brand: { type: String, required: true },
        size: String,
        material: String
    },
    {
        timestamps: true,
        collection: FURNITURE_COLLECTION_NAME
    }
);
module.exports = {
    product: model(PRODUCT_DOCUMENT_NAME, productSchema),
    electronic: model(ELECTRONIC_DOCUMENT_NAME, electronicSchema),
    clothing: model(CLOTHING_DOCUMENT_NAME, clothingSchema),
    furniture: model(FURNITURE_DOCUMENT_NAME, furnitureSchema)
};
