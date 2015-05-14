// app/routes.js
module.exports = function (app, passport) {
    
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    
    app.get('/', function (req, res) {
        res.render('home', { error: req.flash('error'), bclass: "login" });
    });
    
    // process the login form
    app.post('/', passport.authenticate('local-login', {
        successRedirect: '/ingame', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    
    // =====================================
    // register ==============================
    // =====================================
    // show the register form
    app.get('/register', function (req, res) {
        
        res.render('register', { error: req.flash('error'), bclass: "register" });
    });
    
    // process the register form
    
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/stationcreate', // redirect to the secure profile section
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    
    // =====================================
    // Station Create ==============================
    // =====================================
    
    var Station = require('./models/Station.js');
    var user = require('./models/user.js');
    
    // show the stationcreate form
    app.get('/stationcreate', isLoggedIn, function (req, res) {
        var Station = require('./models/Station.js');
        var maxstations = req.user.maxstations;
        var stationcount = req.user.stationcount;
        //console test for station count
        console.log("station count =",stationcount);
        console.log("max stations =", maxstations);

        //start if 
        if (maxstations > stationcount) {
            res.render('stationcreate', {
                bclass: "station",
                user: req.user // get the user out of session and pass to template
            });
        }
        //else
        else {
            //logout
            req.logout();
            res.redirect('/');
        }
    });
    
    // process the stationcreate form
    app.post('/stationcreate', isLoggedIn, function (req, res) {
        Station.update(
            { uID: req.user._id },
            {
                name: req.body.StationName,
                race: req.body.race ,
                population: 100,
                engineers: 1,
                location: { X: 1, Y: 1, Z: 1 } ,
                resources: {
                    currency: 1000,
                    energy: 1000,
                    oxygen: 1000,
                    water: 1000,
                    food: 1000,
                    minerals: 1000,
                    darkMatter: 20
                }, 
                delta: {
                    currency: 5,
                    energy: 20,
                    oxygen: 20,
                    water: 20,
                    food: 20,
                    minerals: 20,
                    darkMatter: 0
                },
                ringWidth: 1,
                levels: 1,
            },
            { upsert: true },
            function (err) {
                if (err) {
                    console.error(err.stack);
                    req.session.flash = {
                        type: 'danger',
                        intro: 'Ooops!',
                        message: 'There was an error proccesing your request.',
                    };
                    return res.redirect(303, '/stationcreate');
                }
                req.session.flash = {
                    type: 'success',
                    intro: 'Thank you!',
                    message: 'You will be notified when this vacation is in season.',
                };
                return res.redirect(303, '/ingame');
            }
        );
        
        //updates the number of stations a user has================
        user.update(
            { _id: req.user._id },
            {
                stationcount: req.user.stationcount +1
            },
            { upsert: true },
            function (err) {
                if (err) {
                    console.error(err.stack);
                    req.session.flash = {
                        type: 'danger',
                        intro: 'Ooops!',
                        message: 'There was an error proccesing your request.',
                    };
                    return res.redirect(303, '/stationcreate');
                }
                console.log("insert complete station count")
                req.session.flash = {
                    type: 'success',
                    intro: 'Thank you!',
                    message: 'You will be notified when this vacation is in season.',
                };
            });
    });
    
    // =====================================
    // Profile ==============================
    // =====================================
    // show the Profile form
    app.get('/profile', isLoggedIn, function (req, res) {
    
    Station.findOne({ uID: req.user._id }, function (err, station) {
        var context = {
            bclass: station.race,
            stationname: station.name, 
            race: station.race,
            darkMatter: station.resources.darkMatter,
            levels: station.levels,
            X: station.location.X,
           Y: station.location.Y, 
           Z: station.location.Z,
           test: req.user
        }
       res.render('profile', context);
    });
        
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
     
    // =====================================
    // ingame  ==============================
    // =====================================
    var Station = require('./models/Station.js');
    var user = require('./models/user.js'); 
    
    app.get('/ingame', isLoggedIn, function (req, res) {
        
       
        Station.findOne({ uID: req.user._id }, function (err, station) {
         //   console.log(station.levels)
            var context = {
                sid: station._id,
                bclass: station.race,
                stationname: station.name, 
                race: station.race,
                level: station.level.one.level,
                darkMatter: station.resources.darkMatter,
                minerals: station.resources.minerals,
                food: station.resources.food,
                water: station.resources.water,
                oxygen: station.resources.oxygen,
                energy: station.resources.energy,
                currency: station.resources.currency,
                ddarkMatter: station.delta.darkMatter,
                dminerals: station.delta.minerals,
                dfood: station.delta.food,
                dwater: station.delta.water,
                doxygen: station.delta.oxygen,
                denergy: station.delta.energy,
                dcurrency: station.delta.currency,
                one: station.level.one,
                levels: station.levels,
                X: station.location.X,
                Y: station.location.Y, 
                Z: station.location.Z,                        
                installations: station.level.one


                
            }

                    var admin = req.user.admin;
                    if (admin == true) {
                        res.render('admin', context);
                    }
                    else {
                        res.render('ingame', context);
                    }
            });
            });
//});
//        });
    
       
    // =====================================
    // install  ==============================
    // =====================================
    
    var Station = require('./models/Station.js');
    var installation = require('./models/installation.js');
    app.post('/install', isLoggedIn, function (req, res) {
        
        Station.findById(req.body.sid, function (err, station) {
            if (err) { console.error(err.stack); }
            
            //only displays installations they can afford
            
            installation.find({
               "cost.currency": { $lte: station.resources.currency},
               "cost.energy": { $lte: station.resources.energy},
               "cost.oxygen": { $lte: station.resources.oxygen},
               "cost.water": { $lte: station.resources.water},
               "cost.food": { $lte: station.resources.food },
               "cost.minerals": { $lte: station.resources.minerals },
               "cost.darkMatter": { $lte: station.resources.darkMatter }

            }, function (err, installations) {
                if (err) { console.error(err.stack); }
                var context = {
                    installations: installations.map(function (installation) {
                        return {
                            sid: req.body.sid,
                            _id: installation._id,
                            name: installation.name,
                            description: installation.description,
                            graphic: installation.graphic,
                            currency: installation.cost.currency,
                            energy: installation.cost.energy,
                            oxygen: installation.cost.oxygen,
                            water: installation.cost.water,
                            food: installation.cost.food,
                            minerals: installation.cost.minerals,
                            darkMatter: installation.cost.darkMatter,
                            dcurrency: installation.delta.currency,
                            denergy: installation.delta.energy,
                            doxygen: installation.delta.oxygen,
                            dwater: installation.delta.water,
                            dfood: installation.delta.food,
                            dminerals: installation.delta.minerals,
                            ddarkMatter: installation.delta.darkMatter
                        }
                    })
                };
                res.render('install', context);
            });
        })
    
    });
          
    //process the install page 
    app.post('/install1', isLoggedIn, function (req, res) {
        
         installation.findById(req.body._id, function (err, install) {
            if (err) return handleError(err);
            
            Station.findById(req.body.sid, function (err, station) {
                if (err) return handleError(err);

                    if (station.resources.currency >= install.cost.currency && 
                    station.resources.energy >= install.cost.energy && 
                    station.resources.oxygen >= install.cost.oxygen &&
                    station.resources.water >= install.cost.water &&
                    station.resources.food >= install.cost.food &&
                    station.resources.minerals >= install.cost.minerals &&
                    station.resources.darkMatter >= install.cost.darkMatter &&
                    station.level.one.length < 8) {

                        install.level = install.level + 1;

                        station.resources.currency = station.resources.currency - install.cost.currency;
                        station.resources.energy = station.resources.energy - install.cost.energy;
                        station.resources.oxygen = station.resources.oxygen - install.cost.oxygen;
                        station.resources.water = station.resources.water - install.cost.water;
                        station.resources.food = station.resources.food - install.cost.food;
                        station.resources.minerals = station.resources.minerals - install.cost.minerals;
                        station.resources.darkMatter = station.resources.darkMatter - install.cost.darkMatter;
                        
                        station.delta.currency = station.delta.currency + install.delta.currency;
                        station.delta.energy = station.delta.energy + install.delta.energy;
                        station.delta.oxygen = station.delta.oxygen + install.delta.oxygen;
                        station.delta.water = station.delta.water + install.delta.water;
                        station.delta.food = station.delta.food + install.delta.food;
                        station.delta.minerals = station.delta.minerals + install.delta.minerals;
                        station.delta.darkMatter = station.delta.darkMatter + install.delta.darkMatter;
                        

                    //installations take up space in the station
                    station.level.one.push(install);
                    console.log(station.level.one[0]);

                    station.save(function (err) {
                        if (err) { console.error(err.stack); }
                        res.redirect('/ingame');
                    
                    });
                }

                else {
                    //cost message
                    res.redirect('/ingame')
                }
            });
        });
    });

    // =====================================
    // map =================================
    // =====================================
    var map = require('./models/map.js');
    

    

    //custom 404 page
    app.use(function (req, res) {
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
    });
    //custom 500 page
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    });
}
    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
        
        // if they aren't redirect them to the home page
        res.redirect('/');


    //https://scotch.io/tutorials/easy-node-authentication-setup-and-local 
    }