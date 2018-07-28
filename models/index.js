"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = config.env.JAWSDB_URL ?"production" : "development";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
if(config.use_env_variable){
  var sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db        = {};

// if(process.env.JAWSDB_URL){
//   sequelize = "production";
// }else{
//   sequelize = process.env.NODE_ENV;
// }


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('../models/users.js')(sequelize, Sequelize);
db.bets = require('../models/bets.js')(sequelize, Sequelize);
db.games = require('../models/games.js')(sequelize, Sequelize);

db.bets.belongsTo(db.users);
db.users.hasMany(db.bets);
db.games.belongsTo(db.bets);
db.bets.hasOne(db.games);

module.exports = db;
