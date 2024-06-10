const express = require("express");
const app = express();
require("dotenv").config();
const tasksRouter = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");

const BACKEND_PORT = process.env.BACKEND_PORT;
const MONGO_URI = process.env.MONGO_URI;

// static assets
app.use(express.static("./public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse JSON
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager hello");
});

app.use("/api/v1/tasks", tasksRouter);

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(BACKEND_PORT, () => {
      console.log(`Server is listening on port ${BACKEND_PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
