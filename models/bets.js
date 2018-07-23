module.exports = function(sequelize, Sequelize) {

	var Bet = sequelize.define('bet', {
		user_id: {
            type: Sequelize.STRING,
            allowNull: false},
        game_id: {
            type: Sequelize.STRING,
            allowNull: false},
        user_pick: {
            type: Sequelize.STRING,
            allowNull: false},
        bet_amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
});

	return Bet;

}