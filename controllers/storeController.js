import { body, param, check } from "express-validator";
import { checkCategoryId } from "../services/categoryServices.js";
import {
  createNewStore,
  getStoresByCategoryId,
} from "../services/storeServices.js";

const createStoreValidator = [
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
  body("category_id")
    .not()
    .isEmpty()
    .withMessage("Category ID must not be empty")
    .isNumeric()
    .withMessage("Category ID should be numeric"),
  body("fb_store_url")
    .optional()
    .isURL()
    .withMessage("FB store URL is not a valid URL"),
  body("insta_store_url")
    .optional()
    .isURL()
    .withMessage("Insta store URL is not a valid URL"),
  body("contact_person_name")
    .not()
    .isEmpty()
    .withMessage("Contact person name must not be empty")
    .isAlpha()
    .withMessage("Contact person name should be text only"),
  body("contact_person_number")
    .not()
    .isEmpty()
    .withMessage("Contact person number must not be empty")
    .isNumeric()
    .withMessage("Contact person number should be numeric"),
];

const createStore = async (req, res, next) => {
  try {
    const { category_id } = req.body;
    await checkCategoryId(category_id);
    await createNewStore(req.body);
    return res.status(200).json("Store created successfully");
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

const getStores = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    await checkCategoryId(category_id);
    const stores = await getStoresByCategoryId(category_id);
    return res.status(200).json(stores);
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
  createStoreValidator,
  getStores,
  createStore,
};
