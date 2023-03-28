'use strict';
const JWT = require('jsonwebtoken');
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        });

        return {
            accessToken,
            refreshToken
        };
    } catch (error) {
        console.log(error);
    }
};

const verifyToken = (token, secret) => {
    return JWT.verify(token, secret);
};
module.exports = {
    createTokenPair,
    verifyToken
};
