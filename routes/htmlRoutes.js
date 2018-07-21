var db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {

      if (req.user){
        // possible change the thread url
        res.redirect("/members");
      }
      res.render("index");
  });

  app.get("/signUp", function(req, res){
    res.render("signUp");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
