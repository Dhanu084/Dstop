const express = require('express');
const router = express.Router();

console.log("Router loaded");
router.get('/',require('../controllers/home-controller').home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
module.exports = router;