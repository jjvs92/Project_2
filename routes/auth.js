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
        user_id: 2,
        game_id: "testing",
        user_pick: "Rangers",
        bet_amount: 45
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
    // console.log(req.body);
    db.Game.create(req.body).then(function(response) {
      res.json(response);
    });
  });

app.put("/api/games/:id", function(req, res) {
    console.log(req.body);
    var realID = req.params.id;
    console.log("Real ID: ");
    console.log(realID);
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