var user = require('../models/user');
var hesapBilgileri = require('../models/hesapBilgileri');
var hesapLog = require('../models/hesapLog');

module.exports.kullaniciGirisGet = function(req, res){
    console.log(req.params.tc);

    user.find({TcKimlikNo: req.params.tc}, function(err, Useresults){
         
        hesapBilgileri.find({hesapSahibiTc: req.params.tc}, function(err,HesapBilgiresults){
            
            res.render('userMainPage', { admin: Useresults, HesapBilgi: HesapBilgiresults});
        });

    });
        
}

module.exports.yeniHesapAcPost = function(req, res){
    var date = new Date();
    var yeniHesap = new hesapBilgileri({
        
        hesapSahibiTc: req.params.tc,
        hesapNo: req.body.HesapAc_hesap_no,
        hesapAdi: req.body.HesapAc_hesap_adi,
        hesapAciklamasi: req.body.HesapAc_hesap_aciklamasi,
        hesapBakiyesi: req.body.HesapAc_hesap_bakiyesi,
        hesapLogId: req.body.HesapAc_hesap_logId
    });

    var yeniLog = new hesapLog({
        
        hesapId: req.body.HesapAc_hesap_logId,
        islemTürü: 'Yeni hesap',
        islemBilgileri: 'Hesap Oluşturuldu'
    });

    //Veritabanına kayıt..
    yeniHesap.save(function(err){
    if(err){
       console.log('Hesap bilgilerini sırasında hata oluştu.:' + err);
    }else {
        yeniLog.save(function(err){
            if(err){
                console.log('Log bilgilerini kaydetme sırasında hata oluştu.:' + err);
            }
        });
    }
});
res.redirect('/kullaniciPage/' + req.params.tc); 
}

module.exports.paraYatirmaPost = function(req, res){
    console.log(req.body);
    var money = parseInt( req.body.parayatırma_Miktar);
    var bakiye;
   
    hesapBilgileri.findOne({hesapNo: req.body.hesapNumarası}, function(err, results){
        bakiye = parseInt(results.hesapBakiyesi);
        bakiye = bakiye + money;
        bakiye = bakiye.toString();

        hesapBilgileri.findOneAndUpdate( {hesapNo: req.body.hesapNumarası}, {$set:{hesapBakiyesi: bakiye}},  {new: true}, 
            (err, doc) => { 
                
            if (err) {
                console.log("Update sırasında hata oluştu:"); 
            }});

    res.redirect('/kullaniciPage/' + req.params.tc);

 });
}


module.exports.paraCekmePost = function(req, res){
    console.log(req.body);
    var money = parseInt( req.body.paracekme_Miktar);
    var bakiye;
   
    hesapBilgileri.findOne({hesapNo: req.body.hesapNumarası}, function(err, results){
        bakiye = parseInt(results.hesapBakiyesi);
        bakiye = bakiye - money;
        bakiye = bakiye.toString();

        hesapBilgileri.findOneAndUpdate( {hesapNo: req.body.hesapNumarası}, {$set:{hesapBakiyesi: bakiye}},  {new: true}, 
            (err, doc) => { 
                
            if (err) {
                console.log("Update sırasında hata oluştu:"); 
            }});

    res.redirect('/kullaniciPage/' + req.params.tc);

 });
}

module.exports.havalePost = function(req, res){
    console.log(req.body);

    var bakiye;
    var bakiye2;
    var bizimHesapNo = req.body.hesapNumarası;
    var hedefHesapNo= req.body.havale_hedefhesap;

    hesapBilgileri.findOne({hesapNo: bizimHesapNo}, function(err, results){
        bakiye = parseInt(results.hesapBakiyesi);
        bakiye = bakiye - parseInt(req.body.havale_Miktar);
        bakiye = bakiye.toString();

        hesapBilgileri.findOneAndUpdate( {hesapNo: bizimHesapNo}, {$set:{hesapBakiyesi: bakiye}},  {new: true}, 
            (err, doc) => { 
                
            if (err) {
                console.log("Update sırasında hata oluştu:"); 
            }});
        
        hesapBilgileri.findOne({hesapNo: hedefHesapNo}, function(err, resultHedef){
            bakiye2 = parseInt(resultHedef.hesapBakiyesi);
            bakiye2 = bakiye2 + parseInt(req.body.havale_Miktar);
            bakiye2 = bakiye2.toString();

            hesapBilgileri.findOneAndUpdate( {hesapNo: hedefHesapNo}, {$set:{hesapBakiyesi: bakiye2}},  {new: true}, 
                (err, doc) => { 
                    
                if (err) {
                    console.log("Update sırasında hata oluştu:"); 
                }});
        });

    
 });

res.redirect('/kullaniciPage/' + req.params.tc);

}