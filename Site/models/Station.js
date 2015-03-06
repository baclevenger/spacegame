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
level:{
        0: {

        },   
        
        1: {
            slot1: {
                installation: mongoose.Schema.ObjectId, slot2: mongoose.Schema.ObjectId, slot3: mongoose.Schema.ObjectId
            },
            slot2: {

            },
            slot3: {

            },
            slot4: {

            },
            slot5: {

            },
            slot6: {

            },
            slot7: {

            },
            slot8: {

            }
        }   
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