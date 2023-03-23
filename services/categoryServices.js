import Category from "../models/Category.js";
import Store from "../models/Store.js";

export async function checkCategoryId(categoryId) {
  const category = await Category.findByPk(categoryId);
  if (!category || category.deleted_at) {
    const error = new Error("Category not found or may be deleted");
    error.statusCode = 404;
    throw error;
  }
  return category;
}

export async function deleteCategoryById(category) {
  await category.update({ deleted_at: Date.now() });
  await Store.destroy({
    where: {
      category_id: category.id,
    },
  });
  await category.save();
}

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

export async function createNewCategory(data) {
  await Category.create({
    arabic_name: data.arabic_name,
    english_name: data.english_name,
    image_url: data.image_url,
  });
}
