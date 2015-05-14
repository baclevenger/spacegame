var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stationSchema = mongoose.Schema({
    uID: mongoose.Schema.ObjectId,
    name: String,
    race: String,
    population: Number,
    engineers: Number, 
    location: {
        X: Number,
        Y: Number,
        Z: Number
    },
    level:{
        0: {

        },   
        one: [{
                name: String,
                description: String,
                graphic: String,
                level: Number,
                req: [{
                        type: Schema.Types.ObjectId,
                        ref: 'research'
                    }],
                cost: {
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
                }


            }],

        two: [{
            type: Schema.Types.ObjectId,
            ref: 'installation'
        }],

        three: [{
            type: Schema.Types.ObjectId,
            ref: 'installation'
        }],
              
    },

    ringWidth: Number,

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