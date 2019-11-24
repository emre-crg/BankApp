var mongoose = require('mongoose');

var Schema = mongoose.Schema;

 
var hesapBilgileriSchema = new Schema({

    hesapSahibiTc: String,
    hesapNo: String,
    hesapAdi: String,
    hesapAciklamasi: String,
    hesapBakiyesi: String,
    hesapLogId: String
    
}, {collection: 'hesapBilgileri'});

var hesapBilgileri = mongoose.model('hesapBilgileri', hesapBilgileriSchema); 

module.exports = hesapBilgileri;