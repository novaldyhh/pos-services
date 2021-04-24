require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const activePort = process.env.ACTIVE_PORT || 8080;
// var corsOptions = { origin: "http://localhost" };
var db = process.env.DB;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log("Connection Interrupted" + e));

// app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BranchController = require("./Controller/BranchController.js");
const UserController = require("./Controller/UserController.js");

app.use("/branch", BranchController);
app.use("/user", UserController);

app.listen(activePort, () => {
  console.log("Server is running in " + activePort);
});
