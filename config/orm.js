// var connection = require('./connection.js');

// var orm = {
//     addGames: function(home_team, away_team) {
//         var queryString = "INSERT INTO games (home_team, away_team) ";
//             queryString += "VALUES (";
//             queryString += "'";
//             queryString += home_team;
//             queryString += "' ";
//             queryString += "'";
//             queryString += away_team;
//             queryString += "'";
//             queryString += ") ";

//         console.log(queryString);

//         connection.query(queryString, function(err, result) {
//             if (err) throw err;
//             console.log(result);
//         });
//     },
// };

// module.exports = orm;