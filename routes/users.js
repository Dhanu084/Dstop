const express = require('express');
const router = express.Router();

router.get('/profile',require('../controllers/users-controller').profile);
router.get('/sign-up',require('../controllers/users-controller').signUp);
router.get('/sign-in',require('../controllers/users-controller').signIn);
router.post('/create',require('../controllers/users-controller').create);
router.post('/create-session',require('../controllers/users-controller').createSession);

module.exports = router;