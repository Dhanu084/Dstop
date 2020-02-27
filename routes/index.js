const express = require('express');
const router = express.Router();

console.log("Router loaded");
router.get('/',require('../controllers/home-controller').home);
module.exports = router;