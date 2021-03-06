//IMPORT FILES
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//IMPORT DB
const db = require("./db/models");

//IMPORT MORGAN
const morgan = require("morgan");

//IMPORT ROUTES
const userRoutes = require("./routes/user");
const foodTruckRoutes = require("./routes/foodtruck");
const categoryRoutes = require("./routes/category");

//MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//PASSPORT
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//ROUTES
app.use(userRoutes);
app.use("/foodtruck", foodTruckRoutes);
app.use("/category", categoryRoutes);

//MEDIA ROUTE
app.use("/media", express.static(path.join(__dirname, "media")));

//404 PAGE NOT FOUND
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path Not Found",
  });
});

//ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

// start the server
app.listen(8000);

//DB settings
<<<<<<< HEAD
db.sequelize.sync();
// db.sequelize.sync({ alter: true });
=======
// db.sequelize.sync();
db.sequelize.sync({ alter: true });
>>>>>>> da672a62e7b23e4c997d1532456b8cdce8e4843b
// db.sequelize.sync({ force: true });
