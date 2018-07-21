var now = require("./time.js");

var findResults = function() {
  setTimeout(function() {
    var winners = [];
    var losers = [];
    $.ajax({
      url:
        "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/" +
        now +
        "/boxscore.json?api_key=v9sa2vk6h75y3kmyj32mudj8",
      type: "GET",
      success: function(res) {
        for (var j = 0; j < res.league.games.length; j++) {
          var thisGame = res.league.games[j];
          var homeTeam = thisGame.game.home.name;
          var awayTeam = thisGame.game.away.name;
          var homeScore = thisGame.game.home.runs;
          var awayScore = thisGame.game.away.runs;
          console.log("Home score: " + homeScore);
          console.log("Away score: " + awayScore);
          if (homeScore > awayScore) {
            winners.push(homeTeam);
            losers.push(awayTeam);
          } else {
            winners.push(awayTeam);
            losers.push(homeTeam);
          }
        }
        console.log("Winners:");
        console.log(winners);
        console.log("Losers:");
        console.log(losers);
      }
    });
  }, 1500);
};

// var postGames = function(gameData) {
//   $.post("/api/games", gameData)
//   .then(showAction);
// };

var showAction = function() {
  var homeTeams = [];
  var awayTeams = [];
  var createDiv = $("<div class='card text-center'></div>");

  $(".loginPrompt").empty();
  $.ajax({
    url:
      "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/2018/07/02/schedule.json?api_key=v9sa2vk6h75y3kmyj32mudj8",
    type: "GET",
    success: function(data) {
      // console.log(data.games.length);
      for (var i = 0; i < data.games.length; i++) {
        var gameNum = [i + 1];
        var awayTeam = data.games[i].away.name;
        var homeTeam = data.games[i].home.name;
        var gameStatus = data.games[i].status;

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
  // postGames();
};

// The API object contains methods for each kind of request we'll make

var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

//Login click handler
$("form").on("submit", function(e) {
  e.preventDefault();
  var userName = $("#userName")
    .val()
    .trim();
  var userPassword = $("#password")
    .val()
    .trim();
  var user = {
    userName: userName,
    userPassword: userPassword
  };
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

  console.log("Username: " + user.userName);
  console.log("Password: " + user.userPassword);

  // $.post("/api/userinfo", {
  //   username: userName,
  //   password: userPassword
  // }).then(function(data){
  //   window.location.replace(data);
  // }).catch(function(err){
  //   console.log(err);
  // });

  // showAction();
});
