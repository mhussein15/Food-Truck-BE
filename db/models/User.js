module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Username length must be more than 6 characters",
        },
      },
      unique: {
        args: true,
        msg: "Username already in use!",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      // allowNull: false,
      unique: {
        args: true,
        msg: "Phone Number already in use!",
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.GEOMETRY("POINT"),
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  });
  return User;
};
