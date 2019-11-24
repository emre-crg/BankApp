var mongoose = require('mongoose');
var mongoUrl = 'localhost:27017/yenidb';

mongoose.Promise = require('bluebird');

mongoose.connect(mongoUrl, function(err,err){

  if(err){
    console.log('mongoose hatasi:' + err);
  }else {
    console.log('mongooser baglandi:' + mongoUrl);
  }
});  

/*
mongoose.connect(mongoUrl, { useNewUrlParser: true }).
  catch(error => handleError(error));
  */