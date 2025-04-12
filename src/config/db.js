const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:admin@custom01.t9dp0vt.mongodb.net/?retryWrites=true&w=majority&appName=custom01/devTinder"
  );
};

module.exports = connectDB;
