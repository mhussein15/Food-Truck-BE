//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");

/*  IMPORT CONTROLLERS  */
const {
  getFoodTruckList,
  getFoodTruckDetail,
  editFoodTruck,
  getFoodTruckByCategory,
  getFoodTruckToUser,
} = require("../controllers/foodTruckController");

/*  IMPORT VALIDATION RULES  */
const {
  foodTruckValidationRules,
} = require("../middleware/validator/foodTruckValidator");
const { validate } = require("../middleware/validator/validate");
const { isFoodTruckUser } = require("../middleware/auth/isAuth");

/*-------Public Routes-------*/

//GET FOOD TRUCK LIST
router.get("/", getFoodTruckList);

//GET FOOD TRUCK DETAIL
router.get("/detail/:foodTruckID", getFoodTruckDetail);

//GET FOOD TRUCK LIST BY CATEGORY
router.get("/category/:categoryID", getFoodTruckByCategory);

/*-------Private Routes-------*/

//EDIT FOOD TRUCK
router.put(
  "/:foodTruckID",
  foodTruckValidationRules(),
  validate,
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  editFoodTruck
);

//RETURN FOOD TRUCKS TO FOODTRUCK USER
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  getFoodTruckToUser
);
module.exports = router;
