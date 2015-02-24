// app/routes.js
module.exports = function (app, passport) {
    
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    
    app.get('/', function (req, res) {
        res.render('home', { error: req.flash('error') });
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
        res.render('register', { error: req.flash('error') });
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
    
    // show the stationcreate form
    app.get('/stationcreate', isLoggedIn, function (req, res) {
        res.render('stationcreate', {
            user: req.user // get the user out of session and pass to template
        });
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
                    darkMatter: 1000
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
    });
    
    
    // =====================================
    // Profile ==============================
    // =====================================
    // show the Profile form
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile', {
            user: req.user // get the user out of session and pass to template
        });
    });
    
    // process the profile form
    
    app.post('/profile', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/ ', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    
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
    var station = require('./models/Station.js');
    app.get('/ingame', isLoggedIn, function (req, res) {
        
        
        //not working, doesn't crash now, but doesn't display from the database. I think it is the 'name' part
        station.find({ StationName: 'name' }, function (err, stations) {
            var context = {
                stations: stations.map(function (station) {
                    return {
                        DarkMatter: station.darkMatter,
                        Minerals: station.minerals,
                        Food: station.food,
                        Water: station.water,
                        Oxygen: station.oxygen,
                        Energy: station.energy,
                        Galactic_Currency: station.currency,
                        Station_Levels: station.levels
                    }
                })
            };
        });

        
//works
        res.render('ingame', {
        })
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
    
    //use to be a '}' here, taking it out seemed to help
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