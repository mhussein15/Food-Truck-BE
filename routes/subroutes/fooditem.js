const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middleware/multer");

const {
  createFoodItem,
  editFoodItem,
  deleteFoodItem,
} = require("../../controllers/foodItemController");

const { isFoodTruckUser } = require("../../middleware/auth/isAuth");

/*-----Food Item-----*/

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  upload.single("image"),
  createFoodItem
);
router.put(
  "/edit/:foodItemID",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  upload.single("image"),
  editFoodItem
);
router.delete(
  "/delete/:foodItemID",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  deleteFoodItem
);

module.exports = router;
