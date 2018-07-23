var now = require("./time.js");

var findResults = function() {
  setTimeout(
    function() {
      var winners = [];
      var losers = [];
      $.ajax({
        url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/2018/07/02/boxscore.json?api_key=v9sa2vk6h75y3kmyj32mudj8",
        type: "GET",
        success: function(res) {
          for (var j = 0; j < res.league.games.length; j++) {
            var thisGame = res.league.games[j];
            var homeTeam = thisGame.game.home.name;
            var awayTeam = thisGame.game.away.name;
            var homeScore = thisGame.game.home.runs;
            var awayScore = thisGame.game.away.runs;

            var winner;
            var findWinner = function() {
              if (homeScore > awayScore) {
                winner = homeTeam
              } else {
                winner = awayTeam
              };
            };
            findWinner();

            function updateWinner() {
              // event.preventDefault();
              var updatedWinner = winner;
              updateGames(updatedWinner)
            };

            function updateGames(games) {
              $.ajax({
                method: "PUT",
                url: "/api/games",
                data: games
              }).then(getGames);
            };

            updateWinner();

            // var newResult = {
            //   game_result: winner
            // };

            // $.put("/api/games", newResult).then(function() {
            //   console.log("New game added");
            //   console.log(newResult);
            // });

            // console.log("Home score: " + homeScore);
            // console.log("Away score: " + awayScore);
            if (homeScore > awayScore) {
              winners.push(homeTeam);
              losers.push(awayTeam);
            } else {
              winners.push(awayTeam);
              losers.push(homeTeam);
            }
          };
          console.log("Winners:");
          console.log(winners);
          console.log("Losers:");
          console.log(losers);
        }
      });
    }, 1500);
    
};

var postGames = function(gameData) {
  $.post("/api/games", gameData)
  .then(getGames);
};

var getGames = function() {
  $.ajax({
    url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/2018/07/02/schedule.json?api_key=v9sa2vk6h75y3kmyj32mudj8",
    type: "GET",
    success: function(data) {
      // console.log(data.games.length);
      for (var i = 0; i < data.games.length; i++) {
        var homeTeams = [];
        var awayTeams = [];
        var awayTeam = data.games[i].away.name;
        var homeTeam = data.games[i].home.name;

        homeTeams.push(homeTeam);
        awayTeams.push(awayTeam);
        // var createDiv = $("<div style='text-align: center;'><h1>Game " + gameNum + "</h1><br></div>");
        // createDiv.append("<p>HOME TEAM:</p>" + "<button class=allTeams>" + homeTeam + "</button>" + "<p> vs </p>" + "<p>AWAY TEAM:</p>" + "<button class=allTeams>" + awayTeam + "</button>" + "<hr>")
      }
    }
  });
};

var showAction = function() {
  var homeTeams = [];
  var awayTeams = [];
  var createDiv = $("<div class='card text-center'></div>");

  $(".loginPrompt").empty();
  $.ajax({
    url:
      "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/" +
      now +
      "/schedule.json?api_key=v9sa2vk6h75y3kmyj32mudj8",
    type: "GET",
    success: function(data) {
      // console.log(data.games.length);
      for (var i = 0; i < data.games.length; i++) {
        var gameNum = [i + 1];
        var awayTeam = data.games[i].away.name;
        var homeTeam = data.games[i].home.name;
        var gameStatus = data.games[i].status;

        var newGame = {
          home_team: homeTeam,
          away_team: awayTeam,
          game_status: gameStatus
        };

        $.post('/api/games', newGame).then(function() {
          console.log("New game added");
          console.log(newGame);
        });

        homeTeams.push(homeTeam);
        awayTeams.push(awayTeam);
        // var createDiv = $("<div style='text-align: center;'><h1>Game " + gameNum + "</h1><br></div>");
        // createDiv.append("<p>HOME TEAM:</p>" + "<button class=allTeams>" + homeTeam + "</button>" + "<p> vs </p>" + "<p>AWAY TEAM:</p>" + "<button class=allTeams>" + awayTeam + "</button>" + "<hr>");
        createDiv.append(
          "<div class='card-header'>Game: " +
            gameNum +
            "</div><div class='card-body'><div class='row'><div class='col-6'><button type='button' class='btn btn-success'>" +
            homeTeam +
            "</button></div><div class='col-6'><button type='button' class='btn btn-success'>" +
            awayTeam +
            "</button></div></div></div><div class='card-footer text-muted'>Status: " +
            gameStatus +
            "</div><br>"
        );

        $(".games").append(createDiv);
      }
    }
  });
  postGames();
};

//Login click handler
$("form-body").on("submit", function() {
  // e.preventDefault();
  // var userName = $("#userName")
  //   .val()
  //   .trim();
  // var userPassword = $("#password")
  //   .val()
  //   .trim();
  // var user = {
  //   userName: userName,
  //   userPassword: userPassword
  // };
  // console.log("Username: " + user.userName);
  // console.log("Password: " + user.userPassword);

  // $.get("/api/userinfo", function(data){

  //   console.log(data);
  //   for(var i =0; i < data.length; i++){
  //     console.log(data[i].userName);
  //     if(userName === data[i].userName){
  //       if(userPassword === data[i].password){
  //         console.log("You signed in");

  //       } else{
  //         alert("Incorrect password");
  //       }
  //     }
  //   else {
  //       alert("This user does not exist");
  //     }
  //   }
  // });
  showAction();
  findResults();

  // console.log("Username: " + user.userName);
  // console.log("Password: " + user.userPassword);
  // $.post("/api/userinfo", {
  //   username: userName,
  //   password: userPassword
  // })
  //   .then(function(data) {
  //     window.location.replace(data);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });

  // showAction();
});

  // $.post("/api/userinfo", {
  //   username: userName,
  //   password: userPassword
  // }).then(function(data){
  //   window.location.replace(data);
  // }).catch(function(err){
  //   console.log(err);
  // });

  // showAction();
// });
