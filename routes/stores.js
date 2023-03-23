import express from "express";
import storeController from "../controllers/storeController.js";
import categoryController from "../controllers/categoryController.js";
import { validateRequestSchema } from "../middlewares/validationResult.js";

const storeRouter = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Stores
 *    description: Endpoints related to actions on stores only
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Store:
 *       type: object
 *       properties:
 *           arabic_name:
 *               type: string
 *               description: The store's name in Arabic
 *               required: true
 *           english_name:
 *               type: string
 *               description: The store's name in English
 *               required: true
 *           fb_store_url:
 *               type: string
 *               description: Facebook URL of the newly created store
 *           insta_store_url:
 *               type: string
 *               description: Instagram URL of the store
 *           category_id:
 *               type: integer
 *               description: ID of the category associated with the store
 *               required: true
 *           contact_person_name:
 *               type: string
 *               description: Contact name of the person responsible for this store
 *           contact_person_number:
 *               type: integer
 *               description: Contact phone number of the person responsible for this store
 */

/**
 * @swagger
 * /create-store:
 *  post:
 *      summary: Creates a new store
 *      tags: [Stores]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Store'
 *      responses:
 *          200:
 *              description: Store created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: The new store ID
 *          400:
 *              description: The request was invalid. You may refer to response for details around why this happened.
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              error:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                      description: Error message
 *          401:
 *              description: User unauthorized to create a new store
 *          404:
 *              description: Category chosen is not found or may have been deleted
 *          500:
 *              description: Internal Server Error
 *      security:
 *       - bearerAuth: []
 */
storeRouter.post(
  "/create-store",
  storeController.createStoreValidator,
  validateRequestSchema,
  storeController.createStore
);

/**
 * @swagger
 * /stores/{category_id}:
 *  get:
 *      summary: Returns all stores available of the given category
 *      tags: [Stores]
 *      parameters:
 *       - in: path
 *         name: category_id
 *         description: The category ID of all the stores retrieved
 *         required: true
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description: Store created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      description: The Store ID
 *                                  data:
 *                                      $ref: '#/components/schemas/Store'
 *          400:
 *              description: The request was invalid. You may refer to response for details around why this happened.
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              error:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                      description: Error message
 *          404:
 *              description: Category not found or may be deleted
 *          500:
 *              description: Internal Server Error
 */
storeRouter.get(
  "/stores/:category_id",
  categoryController.categoryIdValidator,
  validateRequestSchema,
  storeController.getStores
);

export default storeRouter;
