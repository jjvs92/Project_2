module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    wallet: DataTypes.INTEGER
  });
  return User;
};
