import Store from "../models/Store.js";

/**
 * This service function takes a category ID and gets all stores of this
 * particular category. Then, the result is returned but in a different format
 * using the map function where we split the id and the store contents itself.
 * @param {number} categoryId Category ID used in getting the stores query
 * @returns {Array} Array of objects containing the contents of each store
 */
export async function getStoresByCategoryId(categoryId) {
  const stores = await Store.findAll({
    where: {
      category_id: categoryId,
    },
  });
  const result = stores.map((store) => {
    return {
      id: store.id,
      data: {
        arabic_name: store.arabic_name,
        english_name: store.english_name,
        fb_store_url: store.fb_store_url,
        insta_store_url: store.insta_store_url,
        category_id: store.category_id,
        contact_person_name: store.contact_person_name,
        contact_person_number: store.contact_person_number,
      },
    };
  });

  return result;
}

/**
 * A service function used to create a new store. It receives the request body
 * in the data object and extracts the relevant fields from it to be inserted
 * as a new record in the Store table.
 * @param {object} data Request body containing Store info
 * @returns {void}
 */
export async function createNewStore(data) {
  await Store.create({
    arabic_name: data.arabic_name,
    english_name: data.english_name,
    fb_store_url: data.fb_store_url,
    insta_store_url: data.insta_store_url,
    category_id: data.category_id,
    contact_person_name: data.contact_person_name,
    contact_person_number: data.contact_person_number,
  });
}
