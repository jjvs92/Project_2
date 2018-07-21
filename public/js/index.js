var showAction = function() {
  var homeTeams = [];
  var awayTeams = [];
  $(".loginPrompt").empty();
  $.ajax({
    url:
      "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/2018/07/02/schedule.json?api_key=v9sa2vk6h75y3kmyj32mudj8",
    type: "GET",
    success: function(data) {
      console.log(data.games.length);
      for (var i = 0; i < data.games.length; i++) {
        var gameNum = [i + 1];
        var awayTeam = data.games[i].away.name;
        var homeTeam = data.games[i].home.name;

        homeTeams.push(homeTeam);
        awayTeams.push(awayTeam);
        var createDiv = $("<div style='text-align: center;'></div>");
        createDiv.append(
          "<h1>Game " +
            gameNum +
            "</h1><br>" +
            "<p>HOME TEAM: " +
            homeTeam +
            "</p>" +
            "<p> vs </p>" +
            "<p>AWAY TEAM: " +
            awayTeam +
            "</p><hr>"
        );
        $(".games").append(createDiv);
      }
    }
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
  console.log("Username: " + user.userName);
  console.log("Password: " + user.userPassword);
  $.post("/api/userinfo", {
    username: userName,
    password: userPassword
  })
    .then(function(data) {
      window.location.replace(data);
    })
    .catch(function(err) {
      console.log(err);
    });

  showAction();
});
