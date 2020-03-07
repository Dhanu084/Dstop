const express = require('express');
const router = express.Router();
const postscontroller = require('../controllers/posts-controller');

router.post('/create',postscontroller.create);

module.exports = router;