var express = require('express');
var router = express.Router();

var orm = require("../config/orm.js");

router.post('/api/games', function(req, res) {
    orm.addGames(req.body.home_team, req.body.away_team, function(result) {
        res.json({ id: result.insertId });
    });
});

module.exports = router;