//primary app

//setup  ===================================================================
//get tools
var express = require('express');
var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout:'main' });
	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');
 
 app.use(express.static(__dirname + '/public'));

 app.set('port', process.env.PORT || 3000);

 var mongoose = require('mongoose');
 var passport = require('passport');
 var flash = require('connect-flash');

 var morgan = require('morgan');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var session = require('express-session');

//configuration==============================================
 var credentials = require('./config/credentials.js');

//handlebars config
 app.engine('handlebars', handlebars.engine);
 app.set('view engine', 'handlebars');

 // set up our express application
 app.use(morgan('dev')); // log every request to the console
 app.use(cookieParser(credentials.cookieSecret)); // read cookies (needed for auth)
 app.use(bodyParser()); // get information from html forms

 // required for passport
 app.use(session(credentials.sessionSecret)); // session secret
 app.use(passport.initialize());
 app.use(passport.session()); // persistent login sessions
 app.use(flash()); // use connect-flash for flash messages stored in session

 require('./config/passport')(passport); // pass passport for configuration

//database configuration  ===================================================
var opts = {
     server: {
         socketOptions: { keepAlive: 1 }
     }
 };
 switch (app.get('env')) {
     case 'development':
         mongoose.connect(credentials.mongo.development.connectionString, opts);
         break;
     case 'production':
         mongoose.connect(credentials.mongo.production.connectionString, opts);
         break;
     default:
         throw new Error('Unknown execution enviornment: ' + app.get('env'));
 }

 //databse prelim loading ============================================

var user = require('./models/user.js');
var Station = require('./models/Station.js');




//routes =====================================================================


require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//Launch app
app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + 
		app.get('port') + '; press Crtl-C to terminate.');
});
