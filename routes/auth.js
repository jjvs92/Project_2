var authController = require("../controllers/authcontroller.js");
var db = require("../models");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.get("/", authController.signin);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/logout", authController.logout);

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  // This route will get all users so we can compare who has the most money and show on leaderboard

  app.get("/api/users", function(req, res){
    db.user.findAll({
      attributes:["username", "wallet"],
      order: [["wallet", "DESC"]]
      }
    ).then(function(dbUsers){
      res.json(dbUsers);
    })
  });
// -----------------------------------------------------
// This route will post the user's bet to Bets table
  app.post("/api/bets", function(req, res) {
    db.Bet.create({
      user_id: req.body.user_id,
      game_id: req.body.game_id,
      user_name: req.body.user_name,
      user_pick: req.body.user_pick,
      bet_amount: req.body.bet_amount
    }).then(function(dbBets) {
      res.json(dbBets);
    });
  });

  //--------------------------------------------

  // This Route will show all bets

  app.get("/api/bets", function(req, res) {
    db.Bet.findAll().then(function(dbBets) {
      res.json(dbBets);
    });
  });

  //------------------------------------

  // Route that will be used to  check if user has enough funds when attempting to place bet

  app.get("/api/placing/bet/:id", function(req, res) {
    db.user
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });
  // ----------------------------------------------------

  // This route will udpate the users wallet after placing bet

  app.put("/api/user/wallet/:id", function(req, res) {
    console.log(req.body);
    var betID = req.params.id;

    db.user
      .update(
        {
          wallet: req.body.new_wallet
        },
        {
          where: {
            id: betID
          }
        }
      )
      .then(function(response) {
        res.json(response);
      });
  });

  // ----------------------------------------------------

  app.post("/api/games", function(req, res) {
    console.log(req.body);
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
      }
    ).then(function(response) {
      res.json(response);
    });
  });

  // This route is pulling the games from the database to later ensure duplciate games are not posted

  app.get("/api/games", function(req, res) {
    db.Game.findAll().then(function(dbGames) {
      res.json(dbGames);
    });
  });

  app.put("/api/games", function(req, res) {
    console.log(req.body);
    db.Game.update(
      {
        game_result: req.body.game_result
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(response) {
      res.json(response);
    });
  });

  app.get("*", isLoggedIn, authController.dashboard);
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
