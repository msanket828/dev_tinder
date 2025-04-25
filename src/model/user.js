const mongoose = require("mongoose");
const validator = require("validator");
const { default: isURL } = require("validator/lib/isURL");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address", value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        const passwordPatter =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!passwordPatter.test(value)) {
          throw new Error(
            "Password not strong and should be exact 8 character long"
          );
        }
      },
    },
    age: {
      type: Number,
      max: 100,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data in not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image-300x298.jpg",
      validate(value) {
        if (!isURL(value)) {
          throw new Error("Invalid photoUrl");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// schema methods
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user.id }, "S@nk3t@1994", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashPassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashPassword
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
