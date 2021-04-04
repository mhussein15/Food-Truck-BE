const { body } = require("express-validator");

exports.foodTruckAuthValidationRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username is empty")
      .trim()
      .toLowerCase(),
    body("password").notEmpty().withMessage("Password is empty"),
  ];
};

exports.foodTruckValidationRules = () => {
  return [body("name").notEmpty().withMessage("Name is empty").trim()];
};
