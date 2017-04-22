module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // PROFILE SECTION =========================
    app.get('/index', isLoggedIn, function(req, res) {
        res.render('index.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // PATIENT FORMS
    app.get('/form:n', function(req, res) {
        if(! req.params.n in ['1','2','2b','3','4','5','6','7','8','9','_find_exising_patient']) {
            res.send('Invalid form', 404);
        }

        res.render('form'+req.params.n, {});
    });

    // SUBMITTING PATIENT FORMS
    app.post('/form', function(req, res) {
        if(req.body.form_number == "1") {

            console.log(JSON.stringify(req.body));
            res.render('form2', {});
        
        } else if (req.body.form_number == "2") {
            
            if(req.body['first-line-treatment-failure'] == 'on') {
                res.render('form2b', {
                    options: {
                        'contact-with-drug-resistant': req.body['contact-with-drug-resistant']
                    },
                    data: {

                    }
                });
            } else if(req.body['contact-with-drug-resistant'] == 'on') {
                res.render('form2c', {});
            } else {
                res.render('form3', {});
            }
        
        } else if (req.body.form_number == "2b") {
            
            if(req.body['contact-with-drug-resistant'] == 'on') {
                res.render('form2c');
            } else {
                res.render('form3');
            }
        
        } else if (req.body.form_number == "2c") {
        
            res.render('form3', {});
        
        } else if (req.body.form_number == "3") {
        
            res.render('form4', {});
        
        } else if (req.body.form_number == "4") {
            res.render('form5', {});
        
        } else if (req.body.form_number == "5") {
        
            res.render('form6', {});
        
        } else if (req.body.form_number == "6") {
        
            res.render('form7', {});
        
        } else if (req.body.form_number == "7") {
        
            res.render('form8', {});
        
        } else if (req.body.form_number == "8") {
        
            res.render('form9', {});
        
        } else if (req.body.form_number == "9") {
        
            res.render('index', {}); //TODO
        
        } else if (req.body.form_number == "_find_exising_patient") {
        
            // res.render('form', {});
            res.send('Not implemented', 404); //TODO
        } else {
            res.send('Posted to invalid form', 404);
            res.end();
        }
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        // app.get('/login', function(req, res) {
        //     res.render('login.ejs', { message: req.flash('loginMessage') });
        // });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/index', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/index', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/index',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
