const express = require('express');
const router = express.Router();
const authenticateMiddleware = require('../middleware/authmiddleware');

const authController = require('../controllers/auth');

router
    .post('/register', authController.signUp)
    .post('/login', authController.login)
    .get('/test', authenticateMiddleware.isAllowed, authController.isTest)
    .get('/user-auth', authenticateMiddleware.isSignInNeeded, checkUser)

function checkUser(req, res) {
   res.status(200).send({
      ok: true
   })
}

exports.router = router ;
