// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const bodyP = require('body-parser');
require('express-async-errors');
app.use(bodyP.urlencoded({extended:false}));
//app.engine('html', consolidate.nunjucks);
const nunjucks = require("nunjucks");
nunjucks.configure('views', {
    express: app,
    autoescape: true                 // automatic escaping
//    noCache: false                   // cache templates from filesystem
});
app.set('view engine', 'nunjucks');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/*app.get('/', function(req, res) {
    
});*/

app.all('/signin',async function(req, res) {
  //res.send("hello");
  
 
  if( ("login" in req.body)&&("password" in req.body)){
    try{
        await knex('users')
      .insert({ 'login': req.body.login, 'pass': req.body.password,'name':req.body.name, 'color1':req.body.color1,'color2':req.body.color2 });
        res.send("Compte créé avec success");
      }
    catch(err){
        console.log(err);
      res.send("erreur");
      }
  }
 // else
  else {
    res.render('signin.html',{'test':"ok"});
  }
   //
 // res.send("password missng");
});

app.post('/signkin', async function(req, res) {
  //res.render('signin.html');
   var rows = await knex('users');
  //res.send("hello");
  res.render('users.html', { 'users' : rows });

 /* try{
    await knex('users')
  .insert({ 'login': req.body.login, 'pass': req.body.password,'name':req.body.name, 'color1':req.body.color1,'color2':req.body.color2 });
    res.send("Compte créé avec success");

    
  }
  catch(err){
    console.log(err);
  }*/
  
  });
  
app.get('/logout', function(req, res) {
    
});

app.get('/userlist',async function(req, res) {
    var rows = await knex('users');
  //res.send("hello");
  res.render('users.html', { 'users' : rows });

 
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});