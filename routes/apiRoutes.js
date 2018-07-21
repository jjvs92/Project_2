var db = require("../models");
var passport = require("passport");

module.exports = function(app){
  // Get all examples
  app.get("/api/userInfo", function(req, res) {
    db.User.findAll({}).then(function(response) {
      res.json(response);
    });
  });

  // Create a new example
  app.post("/api/userInfo", function(req, res) {
    db.User.create(req.body).then(function(response) {
      res.json(response);
    });
  });

  app.post("/api/games", function(req, res) {
    console.log(req.body);
    db.Game.create(req.body).then(function(response) {
      res.json(response);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/", passport.authenticate("local-signin", {
    successRedirect: "/members",
    failureRedirect: "/"
  }));

  app.get("/members", function(req, res){
    res.render("members");
  })

  // function isLoggedIn(req, res, next){
  //   if(req.isAuthenticated()){
  //     return next()}
  //     res.redirect("/");
  //   }
}

