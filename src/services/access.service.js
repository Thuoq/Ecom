'use strict';
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const ROLE_USER = {
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
    USER: 'USER'
};
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../../utils');
const { BadRequestError } = require('../core/error.response');
class AccessService {
    static signUp = async ({ name, email, password }) => {
        // check email exits
        const user = await userModel.findOne({ email }).lean();
        if (user) {
            throw new BadRequestError('Error: Account has registered !');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash,
            roles: [ROLE_USER.USER]
        });
        if (newUser) {
            // created privateKEy, public
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');
            const keyStores = await KeyTokenService.createKeyToken({
                userId: newUser._id,
                privateKey,
                publicKey
            });
            if (!keyStores) {
                return {
                    code: 'xxxx',
                    message: 'PublicKeyString  error!'
                };
            }

            const tokens = await createTokenPair(
                {
                    userId: newUser._id,
                    email
                },
                publicKey,
                privateKey
            );
            return {
                code: 201,
                metadata: {
                    user: getInfoData({
                        fields: ['email', 'name', '_id'],
                        object: newUser
                    }),
                    tokens
                }
            };
        }
        return {
            code: 200,
            metadata: null
        };
    };
}
module.exports = AccessService;
