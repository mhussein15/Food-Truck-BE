module.exports = (sequelize, DataTypes) => {
    const FoodCategory = sequelize.define("FoodCategory", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return FoodCategory;
  };
  