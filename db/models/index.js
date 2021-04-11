"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Model Realtionship

//Food Truck User ---- Food Truck
db.User.hasOne(db.FoodTruck, { foreignKey: "UserID" });

//User ---- Food Truck
db.User.belongsToMany(db.FoodTruck, {
  through: "FoodTruckCustomer",
  foreignKey: "UserID",
  as: "FoodTrucks",
});
db.FoodTruck.belongsToMany(db.User, {
  through: "FoodTruckCustomer",
  foreignKey: "FoodTruckID",
  as: "Customers",
});

/*Category ---- Food Truck*/
db.Category.belongsToMany(db.FoodTruck, {
  through: "FoodTruckCategory",
});
db.FoodTruck.belongsToMany(db.Category, {
  through: "FoodTruckCategory",
});

/*FoodTruck ---- Food Category*/
db.FoodTruck.hasMany(db.FoodCategory, { onDelete: "cascade" });
db.FoodCategory.belongsTo(db.FoodTruck);

/*FoodCategory ---- FoodItem*/
db.FoodCategory.hasMany(db.FoodItem, { onDelete: "cascade" });
db.FoodItem.belongsTo(db.FoodCategory);

/*FoodTruck ---- WorkingHours*/
db.FoodTruck.hasMany(db.WorkingHours, { onDelete: "cascade" });
db.WorkingHours.belongsTo(db.FoodTruck);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
