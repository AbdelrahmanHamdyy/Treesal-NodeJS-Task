import express from "express";
import categoryController from "../controllers/categoryController.js";
import { validateRequestSchema } from "../middlewares/validationResult.js";

const categoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Categories
 *    description: Endpoints related to dealing with categories
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *       type: object
 *       properties:
 *           arabic_name:
 *               type: string
 *               description: The category's name in Arabic
 *           english_name:
 *               type: string
 *               description: The category's name in English
 *           image_url:
 *               type: string
 *               description: URL of an image displaying a representation of this category
 *           view_count:
 *               type: integer
 *               description: Number of views on this category
 *           created_at:
 *               type: string
 *               format: date-time
 *               description: Date and Time of creation
 *           updated_at:
 *               type: string
 *               format: date-time
 *               description: Last date & time in which this category was updated
 *           deleted_at:
 *               type: string
 *               format: date-time
 *               description: Date and Time of deletion
 */

/**
 * @swagger
 * /create-category:
 *  post:
 *      summary: Creates a new category
 *      tags: [Categories]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  arabic_name:
 *                      type: string
 *                      description: The category's name in Arabic
 *                  english_name:
 *                      type: string
 *                      description: The category's name in English
 *                  image_url:
 *                      type: string
 *                      description: URL of an image displaying a representation of this category
 *      responses:
 *          200:
 *              description: Category created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: The new category ID
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
 *              description: User unauthorized to create a new category
 *          500:
 *              description: Internal Server Error
 *      security:
 *       - bearerAuth: []
 */
categoryRouter.post(
  "/create-category",
  categoryController.createCategoryValidator,
  validateRequestSchema,
  categoryController.createCategory
);

/**
 * @swagger
 * /delete-category/{category_id}:
 *  delete:
 *      summary: Delete a specific category
 *      tags: [Categories]
 *      parameters:
 *       - in: path
 *         name: category_id
 *         description: The ID of the category to be deleted
 *         required: true
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description: Category successfully deleted
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
 *              description: Unauthorized to delete this category
 *          404:
 *              description: The category is already deleted or may be not found
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */
categoryRouter.delete(
  "/delete-category/:category_id",
  categoryController.categoryIdValidator,
  validateRequestSchema,
  categoryController.deleteCategory
);

/**
 * @swagger
 * /category/{category_id}:
 *  get:
 *      summary: Returns details of a specific category given its id
 *      tags: [Categories]
 *      parameters:
 *       - in: path
 *         name: category_id
 *         description: The category ID
 *         required: true
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description: Category details returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           properties:
 *                               id:
 *                                  type: integer
 *                                  description: The Store ID
 *                               data:
 *                                  $ref: '#/components/schemas/Category'
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
categoryRouter.get(
  "/category/:category_id",
  categoryController.categoryIdValidator,
  validateRequestSchema,
  categoryController.getCategory
);

export default categoryRouter;
