'use strict';
const AccessService = require('../services/access.service');
const { CREATED, OK } = require('../core/success.response');
class AccessController {
    login = async (req, res) => {
        new OK({
            message: 'Login Success',
            metadata: await AccessService.logIn(req.body)
        }).send(res);
    };
    signUp = async (req, res) => {
        new CREATED({
            message: 'Created Oke',
            metadata: await AccessService.signUp(req.body)
        }).send(res);
    };
}

module.exports = new AccessController();
