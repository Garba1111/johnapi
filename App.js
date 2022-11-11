const express = require("express");
const app = express();
const port = 3000;

//cors
app.use(require("cors")());

//morgan
app.use(require("morgan")("dev"));

//bodyparser
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ extended: true }));

//dotenv
require("dotenv").config();

//mongoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.mongolink, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("db connected");
    app.listen(port, () => console.log(`running  http://localhost:${port}/`));
  })
  .catch((err) => console.log(err));

//routers
app.use("/", require("./router/home")); // home page
app.use("/register", require("./router/auth/register")); // register page
app.use("/login", require("./router/auth/login")); // login page
app.use("/v/otp", require("./router/auth/verif/otp")); // login page
app.use("/addemergency", require("./router/addemergency")); // addemergency


