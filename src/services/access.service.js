'use strict';
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const ROLE_USER = {
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
    USER: 'USER'
};
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../../utils');
class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // check email exits
            const user = await userModel.findOne({ email }).lean();
            if (user) {
                return {
                    code: 'xxxx',
                    message: 'User already registered!'
                };
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
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }, // Thuật toán bất đối xứng
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey
                });
                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'PublicKeyString  error!'
                    };
                }
                const publicKeyObject = crypto.createPublicKey(publicKeyString);

                const tokens = await createTokenPair(
                    {
                        userId: newUser._id,
                        email
                    },
                    publicKeyObject,
                    privateKey
                );
                console.log('Token:: ', tokens);
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
        } catch (error) {
            console.log(error);
            return error;
        }
    };
}
module.exports = AccessService;
