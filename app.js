const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const LocalStrange = require('passport-local').Strategy;
const expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
const db = require('./app_server/models/db');


app.set('view engine', 'ejs');//ejs'yi tanıtma.

app.set('views', path.join(__dirname, './app_server/views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(expressLayouts);

app.use('/public', express.static(path.join(__dirname, 'public')));

//Yönlendirici(Router) Management'i bağlar
require('./app_server/rotes/routeManagement')(app);


app.listen(8000);