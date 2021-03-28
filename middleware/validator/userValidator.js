const { body } = require("express-validator");

//USER SIGNIN VALIDATION
exports.userSigninValidationRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username is empty")
      .trim()
      .toLowerCase(),
    body("password").notEmpty().withMessage("Password is empty"),
  ];
};

//USER SIGNUP VALIDATION
exports.userSignupValidationRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username is empty")
      .trim()
      .toLowerCase(),
    body("password")
      .notEmpty()
      .withMessage("Password is empty")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .withMessage(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"
      ),
    body("email")
      .notEmpty()
      .withMessage("Email is empty")
      .isEmail()
      .withMessage("Email Format Incorrect")
      .normalizeEmail(),
    // body("phonenumber")
    //   .notEmpty()
    //   .withMessage("Phone Number is empty")
    //   .isMobilePhone("any", { strictMode: true })
    //   .withMessage("Phone Number Format Incorrect"),
  ];
};
