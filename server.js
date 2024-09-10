const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body mei ppura data laake deta hain vo

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/chicken", function (req, res) {
  res.send("Your Chicken Is ready");
});


const personRoutes=require('./routes/personRoutes');

app.use('/person',personRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT);
