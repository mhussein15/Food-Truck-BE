const { FoodCategory, FoodItem, FoodTruck } = require("../db/models");

//CREATE FOOD CATEGORY
exports.createFoodTruckSubMenu = async (req, res, next) => {
  try {
    const categoryName = await FoodCategory.create(req.body);
    await categoryName.setFoodTruck(await req.user.getFoodTruck());
    res.status(201).json(categoryName);
  } catch (error) {
    next(error);
  }
};

//RETURN FOOD CATEGORY AND FOOD ITEMS
exports.getMenu = async (req, res, next) => {
  try {
    const foodtruckID = await req.user.getFoodTruck();
    const categoryName = await FoodCategory.findAll({
      where: {
        FoodTruckId: foodtruckID.id,
      },
      include: {
        model: FoodItem,
        attributes: ["id", "name", "price"],
      },
      attributes: ["id", "name"],
    });
    res.status(200).json(categoryName);
  } catch (error) {
    next(error);
  }
};
//RETURN FOOD CATEGORY AND FOOD ITEMS FOR CUSTOMER
exports.getMenuPublic = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findOne({
      where: {
        id: +req.params.foodTruckID,
      },
      include: {
        model: FoodCategory,
        attributes: ["id", "name"],
        include: {
          model: FoodItem,
          attributes: ["id", "name", "price"],
        },
      },
      attributes: ["id", "name"],
    });
    if (foodTruck) {
      res.status(200).json(foodTruck);
    } else {
      next({
        status: 404,
        message: "Food Truck Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

//EDIT FOOD CATEGORY
exports.editFoodTruckSubMenu = async (req, res, next) => {
  try {
    const foodTruck = await req.user.getFoodTruck();
    const foodCatergory = await FoodCategory.findByPk(
      +req.params.foodCategoryID
    );
    if (foodCatergory) {
      if (
        foodTruck.UserID === req.user.id &&
        foodCatergory.FoodTruckId === foodTruck.id
      ) {
        await foodCatergory.update(req.body);
        res.sendStatus(200);
      } else {
        next({
          status: 403,
          message: "Forbidden",
        });
      }
    } else {
      next({
        status: 404,
        message: "Food Truck Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

//DELETE FOOD CATEGORY
exports.deleteFoodTruckSubMenu = async (req, res, next) => {
  try {
    const foodTruck = await req.user.getFoodTruck();
    const foodCatergory = await FoodCategory.findByPk(
      +req.params.foodCategoryID
    );
    if (foodCatergory) {
      if (
        foodTruck.UserID === req.user.id &&
        foodCatergory.FoodTruckId === foodTruck.id
      ) {
        await foodCatergory.destroy();
        res.sendStatus(204);
      } else {
        next({
          status: 403,
          message: "Forbidden",
        });
      }
    } else {
      next({
        status: 404,
        message: "Food Truck Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
