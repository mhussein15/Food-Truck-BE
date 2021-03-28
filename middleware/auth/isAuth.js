exports.isUser = (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    next({
      status: 403,
      message: "Forbidden",
    });
  }
};
exports.isFoodTruckUser = (req, res, next) => {
  if (req.user.role === "food_truck_user") {
    next();
  } else {
    next({
      status: 403,
      message: "Forbidden",
    });
  }
};
