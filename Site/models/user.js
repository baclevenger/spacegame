// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model

var usersSchema = mongoose.Schema({
	username: String,
	playername: String,
    stationid: Number,
    maxstations: Number,
	local            : {
	    email        : String,
	    password     : String,
	},
	facebook         : {
	    id           : String,
	    token        : String,
	    email        : String,
	    name         : String
	},
	twitter          : {
	    id           : String,
	    token        : String,
	    displayName  : String,
	    username     : String
	},
	google           : {
	    id           : String,
	    token        : String,
	    email        : String,
	    name         : String
    }
});

// methods ======================
// generating a hash
usersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', usersSchema);