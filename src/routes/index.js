const express = require('express');
const router = express.Router();
const accessRouter = require('./access');
const { apiKey, permission } = require('../auth/checkAuth');
router.use(apiKey);
// check permission
router.use(permission);
router.use('/v1/api', accessRouter);
module.exports = router;
