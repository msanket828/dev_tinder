const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./config/db");
const User = require("./model/user");

//signup
app.post("/signup", async (req, res) => {
  const userObject = {
    firstName: "adi",
    lastName: "sawant",
    emailId: "adi@gmail.com",
    passwordd: "123",
  };
  const user = new User(userObject);
  try {
    await user.save();
    res.send("user created...");
  } catch (err) {
    console.log(err.message);
    res.status(400).send(`Error saving the user: ${err.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("mongodb connection established..");
    app.listen(PORT, () => {
      console.log("server in running on port", PORT);
    });
  })
  .catch((err) => console.log(`something went wrong...${err.message}`));
