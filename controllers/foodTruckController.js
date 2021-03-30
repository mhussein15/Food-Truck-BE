const { FoodTruck, Category } = require("../db/models");

//GET FOOD TRUCK LIST
exports.getFoodTruckList = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserID"],
      },
    });
    res.status(200).json(foodTruck);
  } catch (error) {
    next(error);
  }
};

//GET FOOD TRUCK DETAIL
exports.getFoodTruckDetail = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findByPk(+req.params.foodTruckID, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserID"],
      },
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

//EDIT FOOD TRUCK
exports.editFoodTruck = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findByPk(+req.params.foodTruckID);
    if (foodTruck) {
      if (foodTruck.UserID === req.user.id) {
        await foodTruck.update(req.body);
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

//GET FOOD TRUCKS BY CATEGORY
exports.getFoodTruckByCategory = async (req, res, next) => {
  try {
    const foodTruck = await Category.findByPk(+req.params.categoryID, {
      attributes: ["id", "name"],
      include: {
        model: FoodTruck,
        through: {
          attributes: [],
        },
        attributes: ["id", "name"],
      },
    });
    if (foodTruck) {
      res.status(200).json(foodTruck);
    } else {
      next({
        status: 404,
        message: "Catergory Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
