const express = require("express");
const app = express();
const PORT = 3000;

app.use("/test", (req, res) => {
  res.send("test...");
});

app.use("/hello/2", (req, res) => {
  res.send("hello 2...");
});

app.use("/hello", (req, res) => {
  res.send("hello...");
});

app.use("/", (req, res) => {
  res.send("data received...");
});

app.listen(PORT, () => {
  console.log("server in running on port", PORT);
});
