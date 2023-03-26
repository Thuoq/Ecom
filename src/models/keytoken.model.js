'use strict';
const { Schema, model } = require('mongoose');
const DOCUMENT_NAME = 'KeyToken';
const COLLECTION_NAME = 'KeyTokens';
// Declare the Schema of the Mongo model
const keySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        publicKey: {
            type: String,
            required: true
        },
        refreshToken: {
            type: Array,
            default: []
        }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true
    }
);

//Export the model
module.exports = model(DOCUMENT_NAME, keySchema);
