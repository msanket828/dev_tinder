const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");
const requestRouter = express.Router();

// requestRouter.post("/request", userAuth, (req, res) => {
//   try {
//     const user = req.user;
//     res.send(`${user.firstName} sent connection request...`);
//   } catch (error) {
//     res.status(400).send(`Error in sendconnectionrequest: ${error.message}`);
//   }
// });

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatuses = ["ignored", "interested"];
      if (!allowedStatuses.includes(status)) {
        throw new Error(
          "Only allowing to ignored or interestd status requests..."
        );
      }

      //finding the request user is present in db (preventing to sent connection request to non valid user)
      const validToUser = await User.findById(toUserId);
      if (!validToUser) {
        return res.status(400).send("User not found...");
      }

      //checking similar request is not allowed
      const existConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existConnectionRequest) {
        return res.status(400).send("Connection request already exists");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: "Connection request sent successfully",
        data,
      });
    } catch (error) {
      res
        .status(400)
        .send(`Error in ignored/interested request: ${error.message}`);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId;

      const allowedStatuses = ["accepted", "rejected"];
      const isRequestStatusValid = allowedStatuses.includes(status);
      // status validation
      if (!isRequestStatusValid) {
        return res.status(400).json({ message: "Status not allowed!" });
      }
      // checking particular request is present or not (toUserId should be logged in user)
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "connection request not found!" });
      }
      //updating status
      connectionRequest.status = status;
      // updated status stored in db
      const data = await connectionRequest.save();
      res.json({
        message: `Connection request is ${status}`,
        data,
      });
    } catch (error) {
      res
        .status(400)
        .send(`Error in accept or reject request: ${error.message}`);
    }
  }
);

module.exports = requestRouter;
