var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 
var userSchema = new Schema({
  ad: String,
  soyad: String,
  TcKimlikNo: String,
  yas: String,
  email: String,
  sifre: String

}, {collection: 'user'});

var user = mongoose.model('user', userSchema); 

module.exports = user;