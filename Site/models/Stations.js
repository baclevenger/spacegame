var mongoose = require('mongoose');

var stationsSchema = mongoose.Schema({
    uID: Number,
    name: String,
    location: [new Schema({long: Number, lat: Number}, {_id: false})],
    owner: String,
    resources: {
        gCurrency: Number,
        energy: Number,
        oxygen: Number,
        water: Number,
        food: Number,
        minerals: Number,
        darkMatter: Number
    },
    levels: Number,
    iPL:Number,


});
var stations = mongoose.model('stations', stationssSchema);
module.exports = stations;