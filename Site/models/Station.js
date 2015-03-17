var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stationSchema = mongoose.Schema({
    uID: mongoose.Schema.ObjectId,
    name: String,
    race: String,
    location: {
        X: Number,
        Y: Number,
        Z: Number
    },
    level:{
        0: {

        },   
        1: [{
            type: Schema.Types.ObjectId,
            ref: 'installation'
        }],

        2: [{
            type: Schema.Types.ObjectId,
            ref: 'installation'
        }],

        3: [{
            type: Schema.Types.ObjectId,
            ref: 'installation'
        }],
              
    },
    resources: {
        currency: Number,
        energy: Number,
        oxygen: Number,
        water: Number,
        food: Number,
        minerals: Number,
        darkMatter: Number
    },
    delta: {
        currency: Number,
        energy: Number,
        oxygen: Number,
        water: Number,
        food: Number,
        minerals: Number,
        darkMatter: Number
    },
    levels: Number
   


});
var Station = mongoose.model('Station', stationSchema);
module.exports = Station;