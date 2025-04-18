const mongoose = require("mongoose");
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

const User = mongoose.model("User", userSchema);
module.exports = User;
