const keyTokenModel = require('../models/keytoken.model');
const { Types } = require('mongoose');
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // level 0
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // });
            // return tokens ? tokens : null;
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
        return keyTokenModel
            .findOne({
                user: new Types.ObjectId(userId)
            })
            .lean();
    };
    static removeKeyById = (id) => {
        return keyTokenModel.findByIdAndRemove({ _id: id });
    };
}
module.exports = KeyTokenService;
