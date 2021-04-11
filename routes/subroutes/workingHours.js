//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createWorkingHours,
  editWorkingHours,
  deleteWorkingHours,
  getWorkingHoursPublic,
  getWorkingHoursPrivate,
} = require("../../controllers/workingHoursController");
const { isFoodTruckUser } = require("../../middleware/auth/isAuth");

//IMPORT CONTROLLERS

//IMPORT VALIDATION RULES

/*-------Public Routes-------*/
router.get("/:foodTruckID", getWorkingHoursPublic);

/*-------Private Routes-------*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  getWorkingHoursPrivate
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  createWorkingHours
);

router.put(
  "/:workingHourID",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  editWorkingHours
);
router.delete(
  "/:workingHourID",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  deleteWorkingHours
);

module.exports = router;
