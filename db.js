const mongoose = require("mongoose");

//const mongoURL = "mongodb://localhost:27017/hotels ";
const mongoURL =
  "mongodb+srv://vachhanipunit:Punit0!21$@cluster0.cyz0m.mongodb.net/";

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
