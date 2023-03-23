import Category from "../models/Category.js";
import Store from "../models/Store.js";

/**
 * This function takes in a category ID and retrieves the category object
 * from the database using the ID as primary key. If the category isn't found or
 * deleted then a proper error response with status code 404 is returned, else the
 * category we got is returned.
 * @param {number} categoryId ID of the category to be checked
 * @returns {object} The category object retrieved from the database in case of success
 */
export async function checkCategoryId(categoryId) {
  const category = await Category.findByPk(categoryId);
  if (!category || category.deleted_at) {
    const error = new Error("Category not found or may be deleted");
    error.statusCode = 404;
    throw error;
  }
  return category;
}

/**
 * This service function takes a category object and sets its deleted_at
 * attribute to the current date (This means that the category has been deleted). Then,
 * a cascaded delete is performed on the stores of this category.
 * @param {object} category Category object to be deleted
 * @returns {void}
 */
export async function deleteCategoryById(category) {
  await category.update({ deleted_at: Date.now() });
  await Store.destroy({
    where: {
      category_id: category.id,
    },
  });
  await category.save();
}

/**
 * A service function that receives a category object and extracts
 * the relevant fields from it in a new object to be returned as response data. This
 * includes the id & a data object containing all other fields.
 * @param {object} category Category object
 * @returns {object} Same content as the category but in a better format
 */
export function getCategoryDetails(category) {
  return {
    id: category.id,
    data: {
      arabic_name: category.arabic_name,
      english_name: category.english_name,
      image_url: category.image_url,
      view_count: category.view_count,
      created_at: category.created_at,
      updated_at: category.updated_at,
      deleted_at: category.deleted_at,
    },
  };
}

/**
 * A simple service function that receives a data object containing the
 * arabic name, english name & image URL of a category and then creates
 * a new database record in the category table of these info.
 * @param {object} data Request body
 * @returns {void}
 */
export async function createNewCategory(data) {
  await Category.create({
    arabic_name: data.arabic_name,
    english_name: data.english_name,
    image_url: data.image_url,
  });
}
