var showAction = function() {
  var homeTeams = [];
  var awayTeams = [];
  $(".loginPrompt").empty();
  $.ajax({
    url: "https://cors-everywhere.herokuapp.com/http://api.sportradar.us/mlb/trial/v6.5/en/games/2018/07/02/schedule.json?api_key=v9sa2vk6h75y3kmyj32mudj8",
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
        createDiv.append("<h1>Game " + gameNum + "</h1><br>" + "<p>HOME TEAM: " + homeTeam + "</p>" + "<p> vs </p>" + "<p>AWAY TEAM: " + awayTeam + "</p><hr>");
        $(".games").append(createDiv);
      }
    }
  });
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
$("#loginUser").on("click", function(e) {
  e.preventDefault();
  var userName = $("#userName").val().trim();
  var userPassword = $("#password").val().trim();
  var user = {
    userName: userName,
    userPassword: userPassword
  };
  console.log("Username: " + user.userName);
  console.log("Password: " + user.userPassword);
  showAction();
});
