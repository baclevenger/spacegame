// app/routes.js
module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    app.get('/', function (req, res) {
        res.render('home', { error: req.flash('error') });
    });
    // process the login form
    // app.post('/', do all our passport stuff here);

    // =====================================
    // register ==============================
    // =====================================
    // show the register form
    app.get('/register', function (req, res) {
        res.render('register', { error: req.flash('error') });
    });

    // process the register form

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
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