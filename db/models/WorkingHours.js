module.exports = (sequelize, DataTypes) => {
  const WorkingHours = sequelize.define("WorkingHours", {
    days: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openTime: {
      type: DataTypes.TIME,
    },
    closeTime: {
      type: DataTypes.TIME,
    },
  });
  return WorkingHours;
};
