const express = require("express");
const app = express();
const PORT = 3000;

app.use("/user", (req, res) => {
  console.log(req.query);
  res.send("user data...");
});

app.use("/user/:name/:salary", (req, res) => {
  console.log(req.params);
  res.send("user data... ");
});

app.listen(PORT, () => {
  console.log("server in running on port", PORT);
});
