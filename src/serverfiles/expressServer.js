require('app-module-path').addPath(__dirname);
var express = require("express");
var app = express();
var port = process.env.PORT || require("../config/config.json")["port"];
const { Client } = require("pg");
const client = new Client(
  {
  user: "postgresql_demo_2s76_user",
  password: "BroET1oD6Zqrixb4TntLVeee51ueGE4b",
  database: "postgresql_demo_2s76",
  port: 5432,
  host: "dpg-clbre27t6quc73fi3v7g-a.oregon-postgres.render.com",
  ssl: { rejectUnauthorized: false },});

  module.exports = async function () {
    return new Promise((resolve, reject) => {
      client.connect((err) => {
        if (err) {
          console.error("Error connecting to PostgreSQL:", err);
          reject(err);
        } else {
          console.log("Connected to PostgreSQL!");
          resolve({ app, client });
        }
      });
    });
  };



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


