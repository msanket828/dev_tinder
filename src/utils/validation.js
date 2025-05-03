const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name should not be empty");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateEditPassword = (req) => {
  const { password } = req.body;

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong..");
  }
};

const validateEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "gender",
    "age",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditValid = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditValid;
};

module.exports = {
  validateSignupData,
  validateEditData,
  validateEditPassword,
};
