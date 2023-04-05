'use strict';
const { product, electronic, furniture, clothing } = require('../product.model');
const { Types } = require('mongoose');

/**
 *
 * @param ownerId {ObjectId}
 * @param productId {ObjectId}
 * @returns {Promise<void>}
 */
const publishProductByOwner = async ({ ownerId, productId }) => {
    const foundProduct = await product.findOne({
        owner: new Types.ObjectId(ownerId),
        _id: new Types.ObjectId(productId)
    });
    if (!foundProduct) return null;
    foundProduct.isDraft = false;
    foundProduct.isPublished = true;
    const productUpdated = await foundProduct.save();
    return productUpdated;
};
const unPublishProductByOwner = async ({ ownerId, productId }) => {
    const foundProduct = await product.findOne({
        owner: new Types.ObjectId(ownerId),
        _id: new Types.ObjectId(productId)
    });
    if (!foundProduct) return null;
    foundProduct.isDraft = true;
    foundProduct.isPublished = false;
    const productUpdated = await foundProduct.save();
    return productUpdated;
};
const queryProduct = async ({ query, limit, skip }) => {
    return product
        .find(query)
        .populate('owner', 'name email -_id')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
};

const searchProductsByUser = async ({ keySearch }) => {
    const regexSearch = new RegExp(keySearch);
    const products = await product
        .find({
            $text: { $search: regexSearch },
            isPublished: true
        })
        .sort({ score: { $meta: 'textScore' } })
        .lean();

    return products;
};
module.exports = {
    queryProduct,
    publishProductByOwner,
    unPublishProductByOwner,
    searchProductsByUser
};
