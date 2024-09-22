const express = require('express');
const router = express.Router();
const authenticateMiddleware = require('../middleware/authmiddleware');

const authController = require('../controllers/auth');

router
    .post('/register', authController.signUp)
    .post('/login', authController.login)
    .get('/test', authenticateMiddleware.isAllowed, authController.isTest)
    .get('/user-auth', authenticateMiddleware.isSignInNeeded, checkUser)
    .post('/forgot-password', authController.forgotPassword)
    .get('/admin-auth', authenticateMiddleware.isSignInNeeded, authenticateMiddleware.isAllowed, checkAdmin)
    .put('/profile', authController.updateProfile)

function checkAdmin(req, res){
   res.status(200).send({
     ok: true
   })
}

function checkUser(req, res) {
   res.status(200).send({
      ok: true
   })
}

exports.router = router ;
