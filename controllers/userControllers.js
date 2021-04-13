const { User, FoodTruck, Category } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

//SIGNUP
exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    const payload = {
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

//SIGNIN
exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

//GET USER LOCATION
exports.getLocation = async (req, res, next) => {
  try {
    const point = {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude],
    };
    await req.user.update({ location: point });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

//GET FOODTRUCK PARAMS
exports.fetchFoodTruck = async (categoryID, next) => {
  try {
    const foundFoodTrcuk = await FoodTruck.findByPk(categoryID);
    return foundFoodTrcuk;
  } catch (error) {
    next(error);
  }
};

//USER FOLLOW TRUCK
exports.follow = async (req, res, next) => {
  try {
    const check = await req.user.hasFoodTruck(req.foodTruck.id);
    if (!check) {
      await req.user.addFoodTruck(req.foodTruck.id);
      res.sendStatus(204);
    } else {
      next({
        status: 404,
        message: "Food Truck Already Followed",
      });
    }
  } catch (error) {
    next(error);
  }
};

//USER UNFOLLOW TRUCK
exports.unfollow = async (req, res, next) => {
  try {
    const check = await req.user.hasFoodTruck(req.foodTruck.id);
    if (check) {
      await req.user.removeFoodTruck(req.foodTruck.id);
      res.sendStatus(204);
    } else {
      next({
        status: 404,
        message: "Food Truck Not Followed",
      });
    }
  } catch (error) {
    next(error);
  }
};

//USER PROFILE
exports.profile = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.user.username,
      },
      attributes: {
        exclude: ["id", "password", "createdAt", "updatedAt", "role"],
      },
      include: {
        model: FoodTruck,
        as: "FoodTrucks",
        through: {
          attributes: [],
        },
        attributes: ["id", "name", "location", "image"],
      },
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//USER EDIT PROFILE
exports.profileEdit = async (req, res, next) => {
  try {
    delete req.body.password;
    delete req.body.username;
    const updatedUser = await req.user.update(req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
