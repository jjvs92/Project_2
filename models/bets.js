module.exports = function(sequelize, Sequelize) {
  var Bet = sequelize.define("Bet", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    game_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_pick: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bet_amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bet_paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    winner: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "none"
    }
  });
  return Bet;
};
