const routeLogin = require('./LoginRoute');
const routeHome = require('./HomeRoute');
const routeUserMain = require('./UserMainRoute');


module.exports = function(app) {

app.use('/login', routeLogin);
app.use('/', routeHome);
app.use('/kullaniciPage',routeUserMain);
}