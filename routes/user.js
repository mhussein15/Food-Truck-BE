//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");

//IMPORT CONTROLLERS
const {
  signin,
  signup,
  getLocation,
  follow,
  profile,
} = require("../controllers/userControllers");
const { isUser } = require("../middleware/auth/isAuth");

//IMPORT VALIDATION RULES
const {
  userSigninValidationRules,
  userSignupValidationRules,
} = require("../middleware/validator/userValidator");

const { validate } = require("../middleware/validator/validate");

//SIGNIN
router.post(
  "/signin",
  userSigninValidationRules(),
  validate,
  passport.authenticate("local", {
    session: false,
  }),
  signin
);

//SIGNUP
router.post("/signup", userSignupValidationRules(), validate, signup);

//GET LOCATION
router.put(
  "/location",
  passport.authenticate("jwt", { session: false }),
  isUser,
  getLocation
);

//FOLLOW FOODTRUCK
router.post(
  "/follow",
  passport.authenticate("jwt", { session: false }),
  isUser,
  follow
);

//CUSTOMER PROFILE
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  isUser,
  profile
);

module.exports = router;
