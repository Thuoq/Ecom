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
const { findByEmail } = require('./user.service');
const { AuthFailureError, BadRequestError } = require('../core/error.response');
class AccessService {
    static logIn = async ({ email, password, refreshToken = null }) => {
        const user = await findByEmail({ email });
        if (!user) {
            throw new AuthFailureError('Wrong email or password');
        }
        const isMatchingPassword = bcrypt.compare(password, user.password);
        if (!isMatchingPassword) {
            throw new AuthFailureError('Wrong email or password');
        }
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        const { _id: userId } = user;
        const tokens = await createTokenPair(
            {
                userId,
                email: user.email
            },
            privateKey,
            publicKey
        );
        console.log(refreshToken);
        await KeyTokenService.createKeyToken({
            userId,
            privateKey,
            publicKey,
            refreshToken: tokens.refreshToken
        });
        return {
            user: getInfoData({
                fields: ['email', 'name', '_id'],
                object: user
            }),
            tokens
        };
    };
    static signUp = async ({ name, email, password }) => {
        // check email exits
        const user = await findByEmail({ email });
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
            const { _id: userId } = newUser;
            // created privateKEy, public
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');
            const tokens = await createTokenPair(
                {
                    userId,
                    email
                },
                publicKey,
                privateKey
            );
            const keyStores = await KeyTokenService.createKeyToken({
                userId,
                privateKey,
                publicKey,
                refreshToken: tokens.refreshToken
            });
            if (!keyStores) {
                throw new BadRequestError('error');
            }
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
