const express = require("express");
const router = express.Router();
const passport = require("passport");
const { fetchFoodItem } = require("../../controllers/foodItemController");
const {
  editFoodTruckSubMenu,
  deleteFoodTruckSubMenu,
  createFoodTruckSubMenu,
  getMenu,
  getMenuPublic,
} = require("../../controllers/footCategoryController");
const { isFoodTruckUser } = require("../../middleware/auth/isAuth");
const {
  foodTruckValidationRules,
} = require("../../middleware/validator/foodTruckValidator");
const { validate } = require("../../middleware/validator/validate");

const foodItemRoutes = require("../subroutes/fooditem");
/*-----MENU-----*/

/*-----PUBLIC ROUTES-----*/

router.get("/:foodTruckID", getMenuPublic);
/*-----PRIVATE ROUTES-----*/

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  getMenu
);

//EDIT FOOD TRUCK MENU --- FOOD CATEGORY
router.put(
  "/:foodCategoryID",
  foodTruckValidationRules(),
  validate,
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  editFoodTruckSubMenu
);

//DELETE FOOD TRUCK MENU --- FOOD CATEGORY
router.delete(
  "/:foodCategoryID",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  deleteFoodTruckSubMenu
);

//ADD FOOD TRUCK MENU --- FOOD CATEGORY
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isFoodTruckUser,
  createFoodTruckSubMenu
);

router.param("foodCategoryID", async (req, res, next, foodCategoryID) => {
  const foodCategory = await fetchFoodItem(foodCategoryID, next);
  if (foodCategory) {
    req.foodCategory = foodCategory;
    next();
  } else {
    next({
      status: 404,
      message: "Food Category Not Found",
    });
  }
});

router.use("/:foodCategoryID", foodItemRoutes);

module.exports = router;
