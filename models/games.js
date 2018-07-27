module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    home_team: {
      type: DataTypes.STRING,
      allowNull: false
    },
    away_team: {
      type: DataTypes.STRING,
      allowNull: false
    },
    game_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    game_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    game_result: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "none"
    },
    game_date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Game;
};
