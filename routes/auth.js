const express = require('express');
const router = express.Router();
const authenticateMiddleware = require('../middleware/authmiddleware');

const authController = require('../controllers/auth');

router
    .post('/register', authController.signUp)
    .get('/login', authController.login)
    .get('/test', authenticateMiddleware.isAllowed, authController.isTest)

exports.router = router ;
