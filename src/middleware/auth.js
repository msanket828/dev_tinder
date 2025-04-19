const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedMsg = await jwt.verify(token, "S@nk3t@1994");
    const { _id } = decodedMsg;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not exist");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

module.exports = {
  userAuth,
};
