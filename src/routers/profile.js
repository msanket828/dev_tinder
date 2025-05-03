const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {
  validateEditData,
  validateEditPassword,
} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../model/user");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("Fields are not valid to perform edit opeation");
    }
    const loggedInuser = req.user;
    Object.keys(req.body).forEach((k) => (loggedInuser[k] = req.body[k]));
    await loggedInuser.save();
    res.send("profile has updated successfully...");
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validateEditPassword(req);
    const { _id } = req.user;
    const { password } = req.body;
    console.log(_id, password);
    const hashPassword = await bcrypt.hash(password, 10);
    const passwordUpdated = await User.findByIdAndUpdate(
      { _id },
      { password: hashPassword }
    );
    if (passwordUpdated) {
      res.send("Password updated successfully...");
    } else {
      throw new Error("Something went wrong while updating password..");
    }
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

module.exports = profileRouter;
