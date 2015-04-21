var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var installationSchema = mongoose.Schema({
    name: String,
    description: String,
    graphic: String,
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


});
var Installation = mongoose.model('Installation', installationSchema);
module.exports = Installation;