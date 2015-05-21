//primary app

//setup  ===================================================================
//get tools
var express = require('express');
var app = express();

var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
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
var Agenda = require('Agenda');

//configuration==============================================
 var credentials = require('./config/credentials.js');

//handlebars config
 app.engine('handlebars', handlebars.engine);
 app.set('view engine', 'handlebars');

 // set up our express application
 app.use(morgan('dev')); // log every request to the console
 app.use(cookieParser(credentials.cookieSecret)); // read cookies (needed for auth)
 app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms

// required for passport
 app.use(session({
    secret: credentials.sessionSecret, 
    saveUninitialized: true,
    resave: true
 })); // session secret
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
        var agenda = new Agenda({ db: { address: credentials.mongo.development.connectionString } });
         mongoose.connect(credentials.mongo.development.connectionString, opts);
         break;
    case 'production':
        var agenda = new Agenda({ db: { address: credentials.mongo.production.connectionString } });
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
        name: "Water Purifier",
        description: "basic production unit of Water. It purifies water found in space, and that used in the station",
        graphic: "/images/instsmall/Dock1.jpg",
        level: 0,
        cost: {
            currency: 25,
            energy: 50,
            oxygen: 50,
            water: 50,
            food: 50,
            minerals: 50,
            darkMatter: 0,
        },
        delta: {
            currency: -1,
            energy: -8,
            oxygen: -1,
            water: 20,
            food: -1,
            minerals: -1,
            darkMatter: 0
        }
    }).save();
    
    //new installation==============================================================================
    
    new installation({
        name: "Mining Laser",
        description: "Lasers that cut into rock such as astroids, harvesting minerals needed for construction",
        graphic: "/images/instsmall/engineering.jpg",
        level: 0,
        cost: {
            currency:25,
            energy:50,
            oxygen:50,
            water:50,
            food:50,
            minerals:50,
            darkMatter:0,
        },
        delta: {
            currency:-2,
            energy:-12,
            oxygen:-1,
            water:-1,
            food:-1,
            minerals:20,
            darkMatter:0
        }
    }).save();
    
    //new installation==============================================================================
    
    new installation({
        name: "Oxygen Purifier",
        description: "moderate production unit of water",
        graphic: "/images/instsmall/lock1.jpg",
        level: 0,
        cost: {
            currency:25,
            energy:50,
            oxygen:50,
            water:50,
            food:50,
            minerals:50,
            darkMatter:0,
        },
        delta: {
            currency:-2,
            energy:-10,
            oxygen:20,
            water:-2,
            food:-1,
            minerals:-1,
            darkMatter:0
        }
    }).save();
    
    //new installation==============================================================================
    
    new installation({
        name: "Generator",
        description: "basic production unit of energy",
        graphic: "/images/instsmall/hall3.jpg",
        level:0,
        cost: {
            currency:25,
            energy:50,
            oxygen:50,
            water:50,
            food:50,
            minerals:50,
            darkMatter:0,
        },
        delta: {
            currency:-2,
            energy:40,
            oxygen:-1,
            water:-2,
            food:-1,
            minerals:-4,
            darkMatter:0
        }
    }).save();
    
    //new installation==============================================================================
    
    new installation({
        name: "Farm",
        description: "basic production unit of food",
        graphic: "/images/instsmall/o2reclaim.jpg",
        level: 0,
        cost: {
            currency:25,
            energy:50,
            oxygen:50,
            water:50,
            food:50,
            minerals:50,
            darkMatter:0,
        },
        delta: {
            currency:-2,
            energy:-5,
            oxygen:-4,
            water:-4,
            food:20,
            minerals:-2,
            darkMatter: 0
        }
    }).save();

    //new installation==============================================================================
    
    new installation({
        name: "Trade Center",
        description: "basic production unit of money, You trade resources for currency.",
        graphic: "/images/instsmall/hall3.jpg",
        level: 0,
        cost: {
            currency: 25,
            energy: 50,
            oxygen: 50,
            water: 50,
            food: 50,
            minerals: 50,
            darkMatter: 0,
        },
        delta: {
            currency: -30,
            energy: -30,
            oxygen: -30,
            water: -30,
            food: -30,
            minerals: -30,
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

