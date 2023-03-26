'use strict';
const { findById } = require('../services/apikey.service');
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
};

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
        const permissions = req.objectKey?.permissions;
        if (!req.objectKey?.permissions) {
            return res.status(403).json({
                message: 'Permission denied '
            });
        }
        // check permission OK
        const validPermission = permissions.includes(permission);
        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission denied '
            });
        }
        next();
    };
};

module.exports = {
    apiKey,
    permission
};
