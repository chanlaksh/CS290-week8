var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 24780);

app.get('/',function(req,res){
  res.render('home.handlebars')
});

app.get('/get-check',function(req,res){
  var info = [];
  for (var p in req.query){
    info.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = info;
  res.render('get-check', context);
});

app.post('/post-check', function(req,res){
  var info = [];
  for (var p in req.body){
    info.push({'name':p,'value':req.body[p]})
  }

  console.log(info);
  console.log(req.body);

  var context = {};
  context.dataList = info;
  res.render('post-check', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
