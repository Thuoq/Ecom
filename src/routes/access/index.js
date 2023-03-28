const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../helpers');
const { checkAuthentication } = require('../../auth/checkAuth');
const router = express.Router();

// LOGIN AND SIGN UP
router.post('/auth/signup', asyncHandler(accessController.signUp));
router.post('/auth/login', asyncHandler(accessController.login));

// authentication //
router.use(checkAuthentication);
/////////////////////////////////
router.post('/auth/logout', asyncHandler(accessController.logout));
router.post('/auth/refresh-token', asyncHandler(accessController.resetRefreshToken));
module.exports = router;
