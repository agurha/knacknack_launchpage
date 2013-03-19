/**
 * Created with JetBrains WebStorm.
 * User: agurha
 * Date: 19/03/2013
 * Time: 10:36
 * To change this template use File | Settings | File Templates.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();


var MailChimpAPI = require('mailchimp').MailChimpAPI;
var apiKey = '344e36a3085102616758d330b90f43ff-us5';
//var listID = '1a8aa7f4ff';


try {
  var mcApi = new MailChimpAPI(apiKey, { version : '1.3', secure : false });
} catch (error) {
  console.log(error.message);
}


//SETUP
app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// ROUTES
app.get('/', function(req, res) {
  res.render('index', {
    title : 'Home'
  });
});

app.get('/about', function(req,res){
  res.render('about', {
    title: 'About'
  })
})


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});