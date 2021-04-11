const { WorkingHours, FoodTruck } = require("../db/models/");

exports.getWorkingHoursPrivate = async (req, res, next) => {
  try {
    const foodtruckID = await req.user.getFoodTruck();
    const workingHours = await WorkingHours.findAll({
      where: { FoodTruckId: foodtruckID.id },
      attributes: ["id", "days", "openTime", "closeTime"],
    });
    res.status(200).json(workingHours);
  } catch (error) {
    next(error);
  }
};

exports.getWorkingHoursPublic = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findByPk(+req.params.foodTruckID);
    if (foodTruck) {
      const workingHours = await WorkingHours.findAll({
        where: { FoodTruckId: foodTruck.id },
        attributes: ["id", "days", "openTime", "closeTime"],
      });
      res.status(200).json(workingHours);
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

exports.createWorkingHours = async (req, res, next) => {
  try {
    const foodTruck = await req.user.getFoodTruck();
    const workingHoursArray = req.body.slice(0, 7).map((workingday) => ({
      ...workingday,
      FoodTruckId: foodTruck.id,
    }));
    const workingHours = await WorkingHours.bulkCreate(workingHoursArray);
    res.status(201).json(workingHours);
  } catch (error) {
    next(error);
  }
};
exports.editWorkingHours = async (req, res, next) => {
  try {
    const foodTruck = await req.user.getFoodTruck();
    const workingHour = await WorkingHours.findByPk(+req.params.workingHourID);
    if (workingHour) {
      if (foodTruck.id === workingHour.FoodTruckId) {
        const updatedWorkingHour = await workingHour.update(req.body);
        res.status(200).json(updatedWorkingHour);
      } else {
        next({
          status: 403,
          message: "Forbidden",
        });
      }
    } else {
      next({
        status: 404,
        message: "Working Hour Not Avaiable",
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteWorkingHours = async (req, res, next) => {
  try {
    const foodTruck = await req.user.getFoodTruck();
    const workingHour = await WorkingHours.findByPk(+req.params.workingHourID);
    if (workingHour) {
      if (foodTruck.id === workingHour.FoodTruckId) {
        await workingHour.destroy();
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
        message: "Working Hour Not Avaiable",
      });
    }
  } catch (error) {
    next(error);
  }
};
