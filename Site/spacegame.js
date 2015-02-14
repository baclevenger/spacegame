var express = require('express');

var app = express();

var credentials = require('./credentials.js');

var handlebars = require('express3-handlebars')
		.create({defaultLayout:'main' });
	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');
 
 app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
			res.render('home');
});

app.get('/register', function(req, res){
			res.render('register');
});


//custom 404 page
app.use(function(req, res){
			res.type('text/plain');
			res.status(404);
			res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err, req, res, next){
			console.error(err.stack);
			res.type('text/plain');
			res.status(500);
			res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
		app.get('port') + '; press Crtl-C to terminate.');
});

var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions: {keepAlive: 1}
	}
};
switch(app.get('env')){
	case 'development':
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		break;
	case 'production':
		mongoose.connect(credentials.mongo.production.connectionString, opts);
		break;
	default:
		throw new Error('Unknown execution enviornment: '+ app.get('env'));
}

var user = require('./models/space.js');

user.find(function(err, users){
	if(users.length) return;
	
	new user({
		id: 1,
		username: 'iharris',
		password: 'bob',
		playername: 'theDestroyer',
		email: 'iharris@resc.k12.in.us',
		stationid: 1,
	}).save();
});
