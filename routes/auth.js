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

app.post('/api/bets', function(req, res){
    db.Bet.create({
        user_id: req.body.user_id,
        game_id: req.body.game_id,
        user_pick: req.body.user_pick,
        bet_amount: req.body.bet_amount
    }).then(function(dbBets){
        res.json(dbBets);
    })
});

// This Route will show all bets 

app.get("/api/bets", function(req, res){
    db.Bet.findAll().then(function(dbBets){
      res.json(dbBets);
    });
  });

//------------------------------------

app.post("/api/games", function(req, res) {
    console.log(req.body);
    db.Game.create(req.body).then(function(response) {
      res.json(response);
    });
  });

app.put("/api/games/:id", function(req, res) {
    console.log(req.body);
    var realID = req.params.id;
    db.Game.update(
      {
        game_result: req.body.game_result
      },
      {
        where: {
          id: realID
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