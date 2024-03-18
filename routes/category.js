const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
const authenticateMiddleware = require("../helpers/authHelper");

// create category API
router.post(
  '/create-category',
  CategoryController.createCategory
);

// update category API
router.put(
  '/update-category/:id',
  CategoryController.updateCategory
);

// get All Categories
router.get(
  '/all-category',
  CategoryController.getAllCategory
);

// get category by id
router.get(
  '/category/:id',
  CategoryController.getCategoryById
);

// delete category
router.delete(
  '/delete-category',
  CategoryController.deleteCategory
)

exports.router = router;
