var mongoose = require('mongoose');

var stationSchema = mongoose.Schema({
    uID: mongoose.Schema.ObjectId,
    name: String,
    race: String,
    location: {
        X: Number,
        Y: Number,
        Z: Number
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
    levels: Number
   


});
var Station = mongoose.model('Station', stationSchema);
module.exports = Station;