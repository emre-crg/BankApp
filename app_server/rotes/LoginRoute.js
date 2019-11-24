const express = require('express');
const router = express.Router();
const controller = require('../controller/LoginController');

router.get('/', controller.loginGet);
router.post('/', controller.loginPost);

router.get('/signup',controller.singupGet);
router.post('/signup',controller.singupPost);

router.get('/kullanicilarListesi',controller.kullanicilarListesi);

module.exports = router; 