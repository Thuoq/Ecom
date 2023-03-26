const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAMES = 'Users';
const DOCUMENT_NAME = 'User';
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxLength: 150
        },
        email: {
            type: String,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive'
        },
        verify: {
            type: mongoose.Schema.Types.Boolean,
            default: false
        },
        roles: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES
    }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
