const { body } = require("express-validator");

exports.foodTruckValidationRules = () => {
  return [body("name").notEmpty().withMessage("Name is empty").trim()];
};
