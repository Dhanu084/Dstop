const express = require('express');
const router = express.Router();
const postscontroller = require('../controllers/posts-controller');
const passport = require('passport');
router.post('/create',passport.checkAuthentication,postscontroller.create);

module.exports = router;