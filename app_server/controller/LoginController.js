var user = require('../models/user');

module.exports.loginGet = function (req, res) {

    res.render('loginPage');
 }

module.exports.loginPost = function (req, res) {
   user.find({TcKimlikNo: req.body.login_tckimlik, //Tc ve şifre doğrulamsı...
               sifre: req.body.login_sifre}, 

      function(err, results){
         if(err){
            console.log('Giriş Başarısız :' + err);
         }else{
            console.log('Login yapıldı:' + results);            
            res.redirect('/kullaniciPage/' + req.body.login_tckimlik);
         }
   });
 }

module.exports.singupGet = function (req, res) {
   res.render('signupPage');
}

module.exports.singupPost = function (req, res) {

   var newUsers = new user({
      ad: req.body.Signup_ad,
      soyad: req.body.Signup_soyad,
      TcKimlikNo: req.body.Signup_tckimlik,
      yas: req.body.Signup_yas,
      email: req.body.Signup_email,
      sifre: req.body.Signup_sifre    
   });

   //Veritabanına kayıt..
   newUsers.save(function(err){
      if(err){
         console.log('Kaydetme sırasında hata oluştu.:' + err);
      }else{
         console.log('Kayıt Başarılı');
         res.redirect('/login');
      }
   });
   
}

module.exports.kullanicilarListesi = function(req, res){
   user.find(function(err, results){
      console.log(results);
      res.render('kullanicilarListesi', {kullanicilar: results});
   });
}