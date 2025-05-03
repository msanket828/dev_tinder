const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendconnectionrequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(`${user.firstName} sent connection request...`);
  } catch (error) {
    res.status(400).send(`Error in sendconnectionrequest: ${error.message}`);
  }
});

module.exports = requestRouter;
