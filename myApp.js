let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config()

console.log("Hello World")

app.use(bodyParser.urlencoded({extended: false}));

// app.use(express.static(__dirname + "/public"))
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res){
  // res.send("Hello Express");
  absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
})

app.get("/json", function(req, res, next){
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
},function(req, res) {
  var response = "Hello json".toUpperCase();
  if (process.env.MESSAGE_STYLE==="uppercase"){
    response = "Hello json".toUpperCase()
  } else {
    response = "Hello json"
  }
  res.json({"message": response})
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time":req.time});
});

app.get('/:word/echo', function(req,res) {
  res.json({"echo":req.params.word})
})

app.route("/name").get(function(req, res){
  res.json({"name": `${req.query.first} ${req.query.last}`})
}).post(function(req,res){
  res.json({"name": `${req.body.first} ${req.body.last}`})
})




















 module.exports = app;
