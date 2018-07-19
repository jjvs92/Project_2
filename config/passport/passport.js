var db = require("../../models");

var bCrypt = require("bcrypt-nodejs");

console.log(db);

module.exports = function(passport, user){
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;
}

passport.use("local-signup", new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    function(req, email, password, response){
        var generateHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync)
        }
    }
))

