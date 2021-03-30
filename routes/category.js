//IMPORT FILES
const express = require("express");
const router = express.Router();
const passport = require("passport");

//IMPORT CONTROLLERS

const { getCategories } = require("../controllers/categoryController");
//IMPORT VALIDATION RULES

/*-------Public Routes-------*/

//GET CATEGORIES LIST
router.get("/", getCategories);

/*-------Private Routes-------*/

//EDIT FOOD TRUCK

module.exports = router;
