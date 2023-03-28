const keyTokenModel = require('../models/keytoken.model');
const { Types } = require('mongoose');
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId };

            const update = {
                publicKey,
                privateKey,
                refreshTokenUsed: [],
                refreshToken
            };
            const options = {
                upsert: true,
                new: true
            };
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);
            return tokens;
        } catch (error) {
            return error;
        }
    };
    static findByUserId = (userId) => {
        return keyTokenModel.findOne({
            user: new Types.ObjectId(userId)
        });
    };
    static removeKeyById = (id) => {
        return keyTokenModel.findByIdAndRemove({ _id: id });
    };
    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshToken });
    };
}
module.exports = KeyTokenService;
