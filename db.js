const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels ";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to Mongodb");
});

//comment added
module.exports = db;
