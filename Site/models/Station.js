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
                installation: mongoose.Schema.ObjectId,
            },
            slot2: {
                installation: mongoose.Schema.ObjectId, 
            },
            slot3: {
                installation: mongoose.Schema.ObjectId,
            },
            slot4: {
                installation: mongoose.Schema.ObjectId,
            },
            slot5: {
                installation: mongoose.Schema.ObjectId,
            },
            slot6: {
                installation: mongoose.Schema.ObjectId,
            },
            slot7: {
                installation: mongoose.Schema.ObjectId,
            },
            slot8: {
                installation: mongoose.Schema.ObjectId,
            }
        },

    2: {
    slot1: {
        installation: mongoose.Schema.ObjectId,
                },
    slot2: {
        installation: mongoose.Schema.ObjectId, 
                },
    slot3: {
        installation: mongoose.Schema.ObjectId,
                },
    slot4: {
        installation: mongoose.Schema.ObjectId,
                },
    slot5: {
        installation: mongoose.Schema.ObjectId,
                },
    slot6: {
        installation: mongoose.Schema.ObjectId,
                },
    slot7: {
        installation: mongoose.Schema.ObjectId,
                },
    slot8: {
        installation: mongoose.Schema.ObjectId,
            },
    slot9: {
         installation: mongoose.Schema.ObjectId,
                },
    slot10: {
        installation: mongoose.Schema.ObjectId,
                }
        },

        3: {
            slot1: {
                installation: mongoose.Schema.ObjectId,
            },
            slot2: {
                installation: mongoose.Schema.ObjectId, 
            },
            slot3: {
                installation: mongoose.Schema.ObjectId,
            },
            slot4: {
                installation: mongoose.Schema.ObjectId,
            },
            slot5: {
                installation: mongoose.Schema.ObjectId,
            },
            slot6: {
                installation: mongoose.Schema.ObjectId,
            },
            slot7: {
                installation: mongoose.Schema.ObjectId,
            },
            slot8: {
                installation: mongoose.Schema.ObjectId,
            },
            slot9: {
                installation: mongoose.Schema.ObjectId,
            },
            slot10: {
                installation: mongoose.Schema.ObjectId,
            },
            slot11: {
                installation: mongoose.Schema.ObjectId,
            },
            slot12: {
                installation: mongoose.Schema.ObjectId,
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