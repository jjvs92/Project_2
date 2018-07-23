var authController = require('../controllers/authcontroller.js');
var db = require("../models");


module.exports = function(app, passport){

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);


app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/dashboard',
                                                    failureRedirect: '/signup'}
                                                    ));

app.get('/dashboard',isLoggedIn, authController.dashboard);


app.get('/logout',authController.logout);


app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
                                                    failureRedirect: '/signin'}
                                                    ));



app.post("/api/games", function(req, res) {
console.log(req.body);
db.Game.create(req.body).then(function(response) {
    res.json(response);
});
});

app.put("/api/games", function(req, res) {
console.log(req.body);
db.Game.update({
    game_result: req.body.game_result
}, {
    where: {
    id: req.body.id
    }
}).then(function(response) {
    res.json(response);
});
});
                                            
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}