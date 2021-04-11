const { FoodItem, FoodCategory } = require("../db/models");

exports.fetchFoodItem = async (foodCategoryID, next, req) => {
  try {
    const foodCategory = await FoodCategory.findByPk(foodCategoryID);
    return foodCategory;
  } catch (error) {
    next(error);
  }
};

exports.createFoodItem = async (req, res, next) => {
  try {
    const foodTruckID = await req.user.getFoodTruck();
    if (foodTruckID.id === req.foodCategory.FoodTruckId) {
      const foodItem = await FoodItem.create(req.body);
      await foodItem.setFoodCategory(req.foodCategory.id);
      res.status(200).json(foodItem);
    } else {
      next({
        status: 403,
        message: "Forbidden",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.editFoodItem = async (req, res, next) => {
  try {
    const foodTruckID = await req.user.getFoodTruck();
    if (foodTruckID.id === req.foodCategory.FoodTruckId) {
      const foodItem = await FoodItem.findByPk(+req.params.foodItemID);
      if (foodItem) {
        await foodItem.update(req.body);
        res.status(200).json(foodItem);
      } else {
        next({
          status: 404,
          message: "Food Item Not Avaiable",
        });
      }
    } else {
      next({
        status: 403,
        message: "Forbidden",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteFoodItem = async (req, res, next) => {
  try {
    const foodTruckID = await req.user.getFoodTruck();
    if (foodTruckID.id === req.foodCategory.FoodTruckId) {
      const foodItem = await FoodItem.findByPk(+req.params.foodItemID);
      if (foodItem) {
        await foodItem.destroy();
        res.sendStatus(200);
      } else {
        next({
          status: 404,
          message: "Food Item Not Avaiable",
        });
      }
    } else {
      next({
        status: 403,
        message: "Forbidden",
      });
    }
  } catch (error) {
    next(error);
  }
};
