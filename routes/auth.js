const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router
    .post('/register', authController.signUp)
    .get('/login', authController.login)

exports.router = router ; 