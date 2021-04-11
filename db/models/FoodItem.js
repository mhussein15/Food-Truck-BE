module.exports = (sequelize, DataTypes) => {
  const FoodItem = sequelize.define("FoodItem", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return FoodItem;
};
