const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport')

const router = express.Router();

router.get('/signup', userController.user_signup);
router.post('/signup', userController.user_signup_post);
router.get('/login', userController.user_login);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/users/login',
}));

router.get('/logout', userController.user_logout);

module.exports = router;