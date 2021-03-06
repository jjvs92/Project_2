var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  res.render("signin");
};

exports.mybets = function(req, res){
  res.render("bets", {
    userid: req.user.id,
    userName: req.user.username
  });
};

exports.dashboard = function(req, res) {
  res.render("dashboard", {
    userid: req.user.id,
    userWallet: req.user.wallet,
    userName: req.user.username
  });
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
