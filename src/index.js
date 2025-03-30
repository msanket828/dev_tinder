const express = require("express");
const app = express();
const PORT = 3000;

app.use(
  "/user",
  (req, res, next) => {
    console.log("inside handler 1");
    // res.send("1st response...");
    next();
  },
  (req, res, next) => {
    console.log("inside handler 2");
    // res.send("2nd response...");
    next();
  },
  (req, res, next) => {
    console.log("insdie handler 3");
    next();
    // res.send("3rd response...");
  },
  (req, res, next) => {
    console.log("inside handler 4");
    next();
    res.send("4th response...");
  }
);

app.listen(PORT, () => {
  console.log("server in running on port", PORT);
});
