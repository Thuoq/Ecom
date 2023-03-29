'use strict';
const { findById } = require('../services/apikey.service');
const { asyncHandler } = require('../helpers');
const HEADER = require('../core/request.header');
const { AuthFailureError, NotFoundError, ForbiddenError } = require('../core/error.response');
const keyTokenService = require('../services/keyToken.service');
const JWT = require('jsonwebtoken');
const { verifyToken } = require('./authUtils');
const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error '
            });
        }
        // check objKey
        const objKey = await findById(key);
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error '
            });
        }
        req.objKey = objKey;
        next();
    } catch (e) {}
};
const permission = (permission) => {
    return (req, res, next) => {
        const permissions = req.objKey?.permissions;
        console.log(permissions);
        if (!permissions) {
            return res.status(403).json({
                message: 'Permission denied '
            });
        }
        const validPermission = permissions.includes(permission);
        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission denied '
            });
        }
        next();
    };
};
const checkAuthentication = asyncHandler(async (req, res, next) => {
    /**
     * 1 Check userId missing
     * 2 Get accessToken
     * 3 Verify Token
     * 4 Check user in bds ?
     * 5 Check keyStore with this userId ?
     * 6 next()
     * **/
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError('Invalid Request');
    const keyToken = await keyTokenService.findByUserId(userId);
    if (!keyToken) throw new NotFoundError();
    // refreshTokenPayload
    const refreshTokenPayload = req.headers[HEADER.REFRESH_TOKEN];
    if (refreshTokenPayload) {
        const decodedUser = await verifyToken(refreshTokenPayload, keyToken.privateKey);
        if (decodedUser.userId !== userId) throw new ForbiddenError('Invalid user');
        console.log(keyToken);
        req.keyToken = keyToken;
        req.user = decodedUser;
        req.refreshToken = refreshTokenPayload;

        return next();
    }
    // accessToken
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthFailureError('Invalid Request');
    const decodedUser = await verifyToken(accessToken, keyToken.publicKey);

    if (decodedUser.userId !== userId) {
        throw new AuthFailureError('Invalid User');
    }
    req.keyToken = keyToken;
    req.user = decodedUser;
    return next();
});
module.exports = {
    apiKey,
    permission,
    checkAuthentication
};
