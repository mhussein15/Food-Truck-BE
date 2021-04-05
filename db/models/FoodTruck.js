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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instagram: {
      type: DataTypes.STRING,
    },
  });
  return FoodTruck;
};
