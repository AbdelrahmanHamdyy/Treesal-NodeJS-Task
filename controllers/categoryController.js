import { body, param, check } from "express-validator";
import {
  checkCategoryId,
  getCategoryDetails,
  deleteCategoryById,
  createNewCategory,
} from "../services/categoryServices.js";

const createCategoryValidator = [
  body("arabic_name")
    .not()
    .isEmpty()
    .withMessage("Arabic name must not be empty")
    .isAlphanumeric()
    .withMessage("Arabic name should consist of letters and numbers only"),
  body("english_name")
    .not()
    .isEmpty()
    .withMessage("English name must not be empty")
    .isAlphanumeric()
    .withMessage("English name should consist of letters and numbers only"),
  body("image_url")
    .not()
    .isEmpty()
    .withMessage("Image URL must not be empty")
    .isURL()
    .withMessage("Image URL must be a valid URL"),
];

const categoryIdValidator = [
  param("category_id")
    .not()
    .isEmpty()
    .withMessage("Category ID must not be empty")
    .isNumeric()
    .withMessage("Category ID should be numeric"),
];

const createCategory = async (req, res, next) => {
  try {
    await createNewCategory(req.body);
    return res.status(200).json("Category created successfully");
  } catch (error) {
    console.log(error.message);
    if (error.statusCode) {
      if (error.statusCode === 400) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(error.statusCode).json(error.message);
      }
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const category = await checkCategoryId(category_id);
    const result = getCategoryDetails(category);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    if (error.statusCode) {
      if (error.statusCode === 400) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(error.statusCode).json(error.message);
      }
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const category = await checkCategoryId(category_id);
    await deleteCategoryById(category);
    return res.status(204).json("Category deleted successfully");
  } catch (error) {
    console.log(error.message);
    if (error.statusCode) {
      if (error.statusCode === 400) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(error.statusCode).json(error.message);
      }
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  createCategoryValidator,
  categoryIdValidator,
  createCategory,
  getCategory,
  deleteCategory,
};
