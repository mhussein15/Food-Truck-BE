module.exports = (sequelize, DataTypes) => {
  const FoodTruck = sequelize.define("FoodTruck", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Food Truck name already in use!",
      },
    },
    location: {
      type: DataTypes.GEOMETRY("POINT"),
    },
  });
  return FoodTruck;
};
