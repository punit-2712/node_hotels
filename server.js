const express = require("express");
const app = express();
const db = require("./db");

const passport = require("./auth");

require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body mei ppura data laake deta hain vo

//MiddleWare Function

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); // Move on to the next phase
};

//agar pure API mei karwana ho toh
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", localAuthMiddleware, function (req, res) {
  res.send("Hello World");
});
app.get("/chicken", logRequest, function (req, res) {
  res.send("Your Chicken Is ready");
});



const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT);
