//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getFoodTruckList,
  fetchTruck,
  getFoodTruck,
} = require("../controllers/foodTruckController");
const { isFoodTruckUser } = require("../middleware/auth/isAuth");

//IMPORT CONTROLLERS

//IMPORT VALIDATION RULES

//FETCH FOOD TRUCK BY ID
router.param("foodTruckID", async (req, res, next, foodTruckId) => {
  const foundTruck = await fetchTruck(foodTruckId, next);
  if (foundTruck) {
    req.foodTruck = foundTruck;
    next();
  } else {
    next({
      status: 404,
      message: "Food Truck Not Found",
    });
  }
});

//GET FOOD TRUCK LIST
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  getFoodTruckList
);

//GET FOOD TRUCK BY ID
router.get(
  "/:foodTruckID",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  getFoodTruck
);
module.exports = router;
