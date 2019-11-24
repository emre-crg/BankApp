const express = require('express');
const router = express.Router();
const controller = require('../controller/kullaniciMainController');

router.get('/:tc',controller.kullaniciGirisGet);

router.post('/yeniHesapOlustur/:tc', controller.yeniHesapAcPost);

router.post('/paracekme/:tc',controller.paraCekmePost);

router.post('/parayatirma/:tc',controller.paraYatirmaPost);

router.post('/havale/:tc',controller.havalePost);

module.exports = router; 
