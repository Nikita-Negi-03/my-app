require('app-module-path').addPath(__dirname);
var express = require("express");
var app = module.exports = express();
var port = process.env.PORT || require("../config/config.json")["port"];
app.use(express.json());

app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, , authorization"
      );
      res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
      next();
})

var routes = require('./routes');
routes(app);


app.listen(port, () => console.log(`Node app listening on port ${port}!`));
