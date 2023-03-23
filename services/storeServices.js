import Store from "../models/Store.js";
import Category from "../models/Category.js";

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
