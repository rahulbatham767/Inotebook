const mongoose = require("mongoose");

const mongoURI = process.env.url;
const timeout = 30000;

mongoose.set("strictQuery", false);

const connectToMongo = () => {
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to mongo Sucessfully");
    }
  );
};
module.exports = connectToMongo;
