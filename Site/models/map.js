// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model

var mapSchema = mongoose.Schema({
    sector: Number,
    sid: mongoose.Schema.ObjectId,
    x: Number,
    y: Number,
    z: Number
});
