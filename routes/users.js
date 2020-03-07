const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/profile',passport.checkAuthentication,require('../controllers/users-controller').profile);
router.get('/sign-up',require('../controllers/users-controller').signUp);
router.get('/sign-in',require('../controllers/users-controller').signIn);
router.post('/create',require('../controllers/users-controller').create);
router.get('/sign-out',require('../controllers/users-controller').destroySession);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
),require('../controllers/users-controller').createSession);

module.exports = router;