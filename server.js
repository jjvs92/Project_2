var express    = require('express')
var app        = express()
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env        = require('dotenv').load()
var exphbs     = require('express-handlebars')
var path       = require('path');


var PORT = 3000 || process.env.PORT;

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


 // For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// app.use(express.static(__dirname, '/public'))
app.use(express.static(path.join(__dirname, './public')))

 //For Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.set('views', './views')
// app.engine('hbs', exphbs({extname: '.hbs'}));
// app.set('view engine', '.hbs');


//Models
var models = require("./models");


//Routes
var authRoute = require('./routes/auth.js')(app,passport);


//load passport strategies
require('./config/passport/passport.js')(passport,models.user);


//Sync Database
 models.sequelize.sync().then(function(){
console.log('Nice! Database looks fine')

}).catch(function(err){
console.log(err,"Something went wrong with the Database Update!");
});


app.listen(PORT, function() {
  console.log("Listening on PORT: " + PORT);
});
