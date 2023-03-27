const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const router = express.Router();

router.post('/auth/signup', asyncHandler(accessController.signUp));
router.post('/auth/login', asyncHandler(accessController.login));
module.exports = router;
