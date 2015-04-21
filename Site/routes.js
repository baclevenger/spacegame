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
      //  res.render('profile', {
        //    user: req.user, // get the user out of session and pass to template
          //  bclass: "profile"
       // });
    
    
    
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

    // process the profile form
    
    //app.post('/profile', passport.authenticate('local-signup', {
    //    successRedirect: '/profile', // redirect to the secure profile section
    //    failureRedirect: '/ ', // redirect back to the signup page if there is an error
    //    failureFlash: true // allow flash messages
    //}));
    
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
    
    //works 
    var Station = require('./models/Station.js');
    app.get('/ingame', isLoggedIn, function (req, res) {
       
        Station.findOne({ uID: req.user._id }, function (err, station) {
         //   console.log(station.levels);
            var context = {
                sid: station._id,
                bclass:station.race,
                stationname: station.name, 
                race: station.race,
                darkMatter: station.resources.darkMatter,
                minerals: station.resources.minerals,
                food: station.resources.food,
                water: station.resources.water,
                oxygen: station.resources.oxygen,
                energy: station.resources.energy,
                currency: station.resources.currency,
                levels: station.levels,
                X: station.location.X,
                Y: station.location.Y, 
                Z: station.location.Z,
            }
            res.render('ingame', context);
            });
        });
    
    
    
    // =====================================
    // admin  ==============================
    // =====================================
     
    var Station = require('./models/Station.js');
    var user = require('./models/user.js');
    app.get('/admin', isLoggedIn, function (req, res) {
        
        user.findOne({ uID: req.user._id }, function (err, station) {

            var context = {
                admin: user.admin
            }
         
            var admin = req.user.admin;
            if (admin == true) {
                res.render('admin', context);
            }
            else {
                //logout
                req.logout();
                res.redirect('/');
            }

        });
    });
    
    
    

    
    
    // =====================================
    // install  ==============================
    // =====================================
    
    //app.post('/install', passport.authenticate('local-signup', {
    //    successRedirect: '/install', // redirect to the secure profile section
    //    failureRedirect: '/ ', // redirect back to the signup page if there is an error
    //    failureFlash: true // allow flash messages
    //}));
    
      
    var Station = require('./models/Station.js');
    var installation = require('./models/installation.js');
    app.post('/install', isLoggedIn, function (req, res) {
        installation.find({}, function (err, installations){
            var context = {
                sid: req.body.sid,
                installations: installations.map(function (installation) {
                    return {
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
        
    
    });
          
    //process the install page ** not working yet
    app.post('/install1', isLoggedIn, function (req, res) {
        //var installation1 = req.body._id
        installation.findOne({ _id: req.body._id }, {
            _id: installation._id,
            name: installation.name,
            description: installation.description,
            graphic: installation.graphic,
            currency: "installation.cost.currency",
            energy: "installation.cost.energy",
            oxygen: "installation.cost.oxygen",
            water: "installation.cost.water",
            food: "installation.cost.food",
            minerals: "installation.cost.minerals",
            darkMatter: "installation.cost.darkMatter",
            dcurrency: "installation.delta.currency",
            denergy: "installation.delta.energy",
            doxygen: "installation.delta.oxygen",
            dwater: "installation.delta.water",
            dfood: "installation.delta.food",
            dminerals: "installation.delta.minerals",
            ddarkMatter: "installation.delta.darkMatter"
        })
        
        
        Station.update(
            {_id: 'ObjectId("' + req.body.sid +'")' }, {
                $inc: { "rescources.currency":999
                    //resources: {
                    //    currency: 1000,
                    //    energy: 1000,
                    //    oxygen: 1000,
                    //    water: 1000,
                    //    food: 1000,
                    //    minerals: 1000,
                    //    darkMatter: 20
                    //}
                }
                    
                   // the installation they select
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
                    return res.redirect(303, '/install');
                }
                req.session.flash = {
                    type: 'success',
                    intro: 'Thank you!',
                    message: 'You will be notified when this vacation is in season.',
                };
                return res.redirect(303, '/ingame');
                
            }
        );
    });
    
        

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