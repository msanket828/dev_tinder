const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//creating indexes
connectionRequestSchema.index({ fromUserId: 1 });

//pre middleware function to prevent send connection request to same person which is loggedIn
connectionRequestSchema.pre("save", function (next) {
  const request = this;
  if (request.fromUserId.equals(request.toUserId)) {
    throw new Error("you can not send connection request to yourself...");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
