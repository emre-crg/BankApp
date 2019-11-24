const express = require('express');
const router = express.Router();

const controller = require('../controller/HomeController');

router.get('/', controller.AnaSayfa);

module.exports = router; 