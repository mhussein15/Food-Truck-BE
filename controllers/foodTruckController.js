const { FoodTruck } = require("../db/models");

//Get Food Truck List
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


exports.getFoodTruck = async (req, res, next) => {
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

exports.editFoodTruck = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findByPk(+req.params.foodTruckID);
    if (foodTruck) {
      if (foodTruck.UserID === req.user.id) {
        await req.foodTruck.update(req.body);
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
