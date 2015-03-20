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
var installation = require('./models/installation.js');

//installations==============================================================

installation.find(function (err, installations) {
    if (installations.length) return;
    
    new installation({
        name: "Solar Panel",
        description: "basic production unit of energy",
        graphic: "/images/instsmall/Dock1.jpg",
        cost: {
            currency: 16,
            energy: 5,
            oxygen: 3,
            water: 3,
            food: 10,
            minerals: 20,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 25,
            oxygen: 0,
            water: 0,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
    
    //new installation==============================================================================
    
    new installation({
        name: "Hydroxification center",
        description: "advanced production unit of water",
        graphic: "/images/instsmall/images.jpg",
        cost: {
            currency: 1600,
            energy: 500,
            oxygen: 300,
            water: 300,
            food: 1000,
            minerals: 2000,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 2500,
            oxygen: 0,
            water: 5000,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
    
    //new installation==============================================================================
    
    new installation({
        name: "osmosis chamber",
        description: "moderate production unit of water",
        graphic: "/images/instsmall/lock1.jpg",
        cost: {
            currency: 160,
            energy: 50,
            oxygen: 30,
            water: 30,
            food: 100,
            minerals: 200,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 250,
            oxygen: 0,
            water: 500,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
    
    //new installation==============================================================================
    
    new installation({
        name: "mining hub",
        description: "basic production unit of minerals",
        graphic: "/images/instsmall/hall3.jpg",
        cost: {
            currency: 160,
            energy: 50,
            oxygen: 30,
            water: 30,
            food: 100,
            minerals: 200,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 250,
            oxygen: 0,
            water: 0,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
    
    //new installation==============================================================================
    
    new installation({
        name: "hydro plant",
        description: "basic production unit of water",
        graphic: "/images/instsmall/o2reclaim.jpg",
        cost: {
            currency: 16,
            energy: 5,
            oxygen: 3,
            water: 3,
            food: 10,
            minerals: 20,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 25,
            oxygen: 0,
            water: 0,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
});




//routes =====================================================================


require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//Launch app
app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + 
		app.get('port') + '; press Crtl-C to terminate.');
});
