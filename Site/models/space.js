var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
	id: Number,
	username: String,
	password: String,
	playername: String,
	email: String,
	stationid: Number,
});
var user = mongoose.model('user', usersSchema);
module.exports = user;