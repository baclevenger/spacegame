// app/routes.js
module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/register', function (req, res) {
        res.render('register');
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

    //https://scotch.io/tutorials/easy-node-authentication-setup-and-local 
}