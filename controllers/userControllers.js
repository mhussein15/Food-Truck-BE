const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

//SIGNUP
exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create({ ...req.body, location: point });
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
      coordinates: [50.55629253387451, 26.224985917279337],
    };
    await req.user.update({ location: point });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

//USER PROFILE
