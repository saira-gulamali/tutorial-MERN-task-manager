const express = require("express");
const app = express();
require("dotenv").config();
const tasksRouter = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");
const notFound = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
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

app.use(notFound);
app.use(errorHandlerMiddleware);

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
