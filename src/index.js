const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./config/db");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// get profile details with the email

app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;
  try {
    const userDetail = await User.find({ emailId: userEmailId });
    if (userDetail.length < 1) {
      res.status(404).send("user not found...");
    } else {
      res.send(userDetail);
    }
  } catch (error) {
    console.log(error.message);
    res.send(`Failed to get userDetails...${error.message}`);
  }
});

// get all users

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length < 1) {
      res.status(404).send("no users avaialble");
    } else {
      res.send(users);
    }
  } catch (error) {
    console.log(error.message);
    res.send(`Failed to get all users... ${error.message}`);
  }
});

// delete api
app.delete("/user", async (req, res) => {
  const userID = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userID });
    if (user) {
      res.send("user deleted successfully...");
    }
  } catch (error) {
    console.log(error.message);
    res.send("Error while delete api ...", error.message);
  }
});

// update user (patch)
app.patch("/user/:userid", async (req, res) => {
  const userId = req.params?.userid;
  const data = req.body;
  try {
    const validUpdates = [
      "firstName",
      "lastName",
      "password",
      "gender",
      "skills",
      "photoUrl",
      "about",
    ];
    const isValidUpdate = Object.keys(data).every((k) =>
      validUpdates.includes(k)
    );
    if (!isValidUpdate) {
      throw new Error("Some fileds are not allowed to update");
    }
    // const user = await User.findByIdAndUpdate({ _id: userId }, data);
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });

    if (user) {
      res.send("User data updated...");
    }
  } catch (error) {
    console.log(error.message);
    res.send(`Error in patch request... ${error.message}`);
  }
});

// update user (put)
app.put("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    // Optional: remove userId from data to avoid modifying _id field
    delete data.userId;

    // Replace the entire document using `overwrite: true`
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, data);

    if (updatedUser) {
      res.send("User fully replaced...");
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Error in PUT request... ${error.message}`);
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
