//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");

/*  IMPORT CONTROLLERS  */
const {
  getFoodTruckList,
  getFoodTruckDetail,
  getFoodTruckByCategory,
  getFoodTruckToUser,
  getFoodTruckLocation,
  getUserLocationHeatMap,
  signin,
} = require("../controllers/foodTruckController");

/*  IMPORT VALIDATION RULES  */
const {
  foodTruckValidationRules,
  foodTruckAuthValidationRules,
} = require("../middleware/validator/foodTruckValidator");
const { validate } = require("../middleware/validator/validate");
const { isFoodTruckUser } = require("../middleware/auth/isAuth");

/*  IMPORT ROUTES  */
const menuRoutes = require("../routes/subroutes/menu");
const workingHoursRoutes = require("../routes/subroutes/workingHours");
const { getMenuPublic } = require("../controllers/footCategoryController");

/*-------Public Routes-------*/

//GET FOOD TRUCK LIST
router.get("/", getFoodTruckList);

//GET FOOD TRUCK DETAIL
router.get("/detail/:foodTruckID", getFoodTruckDetail);

//GET FOOD TRUCK LIST BY CATEGORY
router.get("/category/:categoryID", getFoodTruckByCategory);

/*-------Private Routes-------*/

//FOOD TRUCK SIGNIN
router.post(
  "/signin",
  foodTruckAuthValidationRules(),
  validate,
  passport.authenticate("local", { session: false }),
  isFoodTruckUser,
  signin
);

//RETURN FOOD TRUCKS TO FOODTRUCK USER
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  getFoodTruckToUser
);

//GET FOOD TRUCK LOCATION
router.put(
  "/location/:foodTruckID",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  getFoodTruckLocation
);

//GET USERS LOCATION FOR HEATMAP
router.get(
  "/heatmap/",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  getUserLocationHeatMap
);

/*-----MENU-----*/

router.get("/:foodTruckID/menu", getMenuPublic);

router.use("/menu", menuRoutes);

/*-----Working Hours-----*/

router.use("/workinghours", workingHoursRoutes);

module.exports = router;
