//setup
var mongoose = require('mongoose');
var Agenda = require('Agenda');
require("console-stamp")(console, "HH:MM:ss.l");

//configuration==============================================
var credentials = require('./config/credentials.js');

//database configuration  ===================================================
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
switch ('development') {
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

//var user = require('./models/user.js');
var Station = require('./models/Station.js');
var installation = require('./models/installation.js');

agenda.define("test", function (job, one) {
    console.log("test");
    

});
console.log("Delta Initialized...")

agenda.every("1 minutes" , "test");


agenda.define('process delta', function (job, done) {
    console.log("delta running");
    
    Station.find({}, function (err, station) {
        if (err) return handleError(err);
        
        for (var i = 0; i < station.length; i++) {
            //        ^^^^
            console.log(station[i]);
    
        

        
            station[i].resources.currency = station[i].resources.currency + station[i].delta.currency;
            station[i].resources.energy = station[i].resources.energy + station[i].delta.energy;
            station[i].resources.oxygen = station[i].resources.oxygen + station[i].delta.oxygen;
            station[i].resources.water = station[i].resources.water + station[i].delta.water;
            station[i].resources.food = station[i].resources.food + station[i].delta.food;
            station[i].resources.minerals = station[i].resources.minerals + station[i].delta.minerals;
            station[i].resources.darkMatter = station[i].resources.darkMatter + station[i].delta.darkMatter;
        

        
            station[i].save(function (err) {
                if (err) { console.error(err.stack); }
        
            });
        }

            
        });
        console.log("delta complete");
    
    done();
});

agenda.every('1 minutes', 'process delta');

agenda.start();

