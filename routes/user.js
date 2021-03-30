//IMPORT FILES
const e = require("express");
const express = require("express");
const router = express.Router();
const passport = require("passport");

//IMPORT CONTROLLERS
const {
  signin,
  signup,
  getLocation,
  follow,
  unfollow,
  profile,
  profileEdit,
  fetchFoodTruck,
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

router.param("foodTruckID", async (req, res, next, foodTruckID) => {
  const foodFound = await fetchFoodTruck(foodTruckID, next);
  if (foodFound) {
    req.foodTruck = foodFound;
    next();
  } else {
    next({
      status: 404,
      message: "Food Truck Not Found",
    });
  }
});

//FOLLOW FOODTRUCK
router.post(
  "/follow/:foodTruckID",
  passport.authenticate("jwt", { session: false }),
  isUser,
  follow
);
//UNFOLLOW FOODTRUCK
router.post(
  "/unfollow/:foodTruckID",
  passport.authenticate("jwt", { session: false }),
  isUser,
  unfollow
);

//CUSTOMER PROFILE
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  isUser,
  profile
);

router.put(
  "/profile/edit",
  passport.authenticate("jwt", { session: false }),
  isUser,
  profileEdit
);

module.exports = router;
