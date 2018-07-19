$("#createUser").on("click", function(e) {
  e.preventDefault();

  var newUser = {
    userName: $("#inputUsername").val().trim(),
    firstName: $("#inputFirstName").val().trim(),
    lastName: $("#inputLastName").val().trim(),
    email: $("#inputEmail").val().trim(),
    password: $("#inputPassword").val().trim(),
    wallet: 500
  };

  $.post('/api/userInfo', newUser).then(function(){
      console.log("new user added");
      console.log(newUser)
  })
});