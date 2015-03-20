var installation = require('./models/installation.js');

installation.find(function (err, installation) {
    if (installation.length) return;
    
    //new installation==============================================================================

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
    
    //new installation==============================================================================

    new installation({
        name: "Hydroxification center",
        description: "advanced production unit of water",
        graphic: "link",
        cost: {
            currency: 1600,
            energy: 500,
            oxygen: 300,
            water: 300,
            food: 1000,
            minerals: 2000,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 2500,
            oxygen: 0,
            water: 5000,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
    
    //new installation==============================================================================

    new installation({
        name: "osmosis chamber",
        description: "moderate production unit of water",
        graphic: "link",
        cost: {
            currency: 160,
            energy: 50,
            oxygen: 30,
            water: 30,
            food: 100,
            minerals: 200,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 250,
            oxygen: 0,
            water: 500,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();
    
    //new installation==============================================================================

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
    
    //new installation==============================================================================
    
    new installation({
        name: "mining hub",
        description: "basic production unit of minerals",
        graphic: "link",
        cost: {
            currency: 160,
            energy: 50,
            oxygen: 30,
            water: 30,
            food: 100,
            minerals: 200,
            darkMatter: 0,
        },
        delta: {
            currency: 0,
            energy: 250,
            oxygen: 0,
            water: 0,
            food: 0,
            minerals: 0,
            darkMatter: 0
        }
    }).save();

    //new installation==============================================================================

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