var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var hesapLogSchema = new Schema({

    hesapId: String,
    islemTürü: String,
    islemBilgileri: String,
    islemTarihi: Date
    
}, {collection: 'hesapLog'});

var hesapLog = mongoose.model('hesapLog', hesapLogSchema); 

module.exports = hesapLog;