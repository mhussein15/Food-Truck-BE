const { Category } = require("../db/models");

//GET CATEGORIES LIST
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name", "image", "description"],
    });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
