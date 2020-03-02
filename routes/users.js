const express = require('express');
const router = express.Router();

router.use('/profile',require('../controllers/users-controller').profile);
module.exports = router;