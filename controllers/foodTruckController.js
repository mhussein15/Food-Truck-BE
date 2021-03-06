const { FoodTruck, Category, User, FoodCategory } = require("../db/models");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

//GET FOOD TRUCK LIST
exports.getFoodTruckList = async (req, res, next) => {
  try {
    const foodTrucks = await FoodTruck.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserID"],
      },
    });
    res.status(200).json(foodTrucks);
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

//FOOD TRUCK SIGNIN
exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

//GET FOOD TRUCKS BY CATEGORY
exports.getFoodTruckByCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(+req.params.categoryID, {
      attributes: ["id", "name"],
      include: {
        model: FoodTruck,
        through: {
          attributes: [],
        },
        attributes: ["id", "name", "image", "location"],
      },
    });
    if (category) {
      res.status(200).json(category);
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

//RETURN FOOD TRUCK INFO TO FOOD TRUCK USER
exports.getFoodTruckToUser = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findOne({
      where: {
        UserID: req.user.id,
      },
      attributes: ["id", "name"],
    });
    res.status(200).json(foodTruck);
  } catch (error) {
    next(error);
  }
};

//GET FOODTRUCK LOCATION
exports.getFoodTruckLocation = async (req, res, next) => {
  try {
    const foodTruck = await FoodTruck.findByPk(+req.params.foodTruckID);
    if (foodTruck) {
      if (foodTruck.UserID === req.user.id) {
        const point = {
          type: "Point",
          coordinates: [req.body.longitude, req.body.latitude],
        };
        await foodTruck.update({ location: point });
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

//RETURN CUSTOMER LOCATION TO FOODTRUCK USER
exports.getUserLocationHeatMap = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        role: "user",
      },
      attributes: ["location"],
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
