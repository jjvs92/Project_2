module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    home_team: DataTypes.STRING,
    away_team: DataTypes.STRING
  });
return Game;
};