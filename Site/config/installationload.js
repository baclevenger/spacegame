var installation = require('./models/installation.js');

installation.find(function (err, installation) {
    if (installation.length) return;
    
    new installation({
        name: "Solar Panel",
        description: "basic production unit of energy",
        graphic: "link",
        cost: {
            currency: 16,
            energy: 5,
            oxygen: 3,
            water: 3,
            food: 10,
            minerals: 20,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 25,
            oxygen: 0,
            water: 0,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
    
    
    
    new installation({
        name: "hydro plant",
        description: "basic production unit of water",
        graphic: "link",
        cost: {
            currency: 16,
            energy: 5,
            oxygen: 3,
            water: 3,
            food: 10,
            minerals: 20,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 25,
            oxygen: 0,
            water: 0,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
});