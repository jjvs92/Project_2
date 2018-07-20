var db = require("../models");
var passport = require("../config/passport/passport.js");

module.exports = function(app) {
  // Get all examples
  app.get("/api/userinfo", function(req, res) {
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

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/userinfo", passport.authenticate("local"), function(req, res){
      // update url to lobby
      res.json("/members");
  })
};
