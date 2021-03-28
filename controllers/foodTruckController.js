const { FoodTruck } = require("../db/models");

//Get Food Truck List
exports.getFoodTruckList = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findAll({
      where: {
        UserID: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserID"],
      },
    });
    res.status(200).json(foodTruck);
  } catch (error) {
    next(error);
  }
};

exports.fetchTruck = async (foodTruckId, next) => {
  try {
    const foodTruck = await FoodTruck.findByPk(foodTruckId);
    return foodTruck;
  } catch (error) {
    next(error);
  }
};

exports.getFoodTruck = (req, res) => res.status(200).json(req.foodTruck);
