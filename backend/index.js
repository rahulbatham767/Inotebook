const express = require("express");
require("dotenv").config();
const connectToMongo = require("./db");
connectToMongo();

const app = express();
const port = 4000;
var cors = require("cors");

app.use(
  cors({  origin: ["https://inotebook-frontend-three.vercel.app", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // include credentials like cookies
  })
);

app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend  listening at http://localhost:${port}`);
});
