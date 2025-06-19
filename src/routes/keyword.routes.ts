import express from "express";
import * as keywordController from "../controllers/keyword.controller";

const keywordRoutes = express.Router();

/**
 * @swagger
 * /api/keywords/getAll:
 *   get:
 *     tags:
 *       - Keyword
 *     summary: Get all keywords
 *     description: Get all keywords
 *     responses:
 *       '200':
 *         description: A list of keywords
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Keyword'
 *       '500':
 *         description: Internal server error
 */
keywordRoutes.get("/getAll", keywordController.getAllKeywords);

/**
 * @swagger
 * /api/keywords/getAll/:id:
 *   get:
 *     tags:
 *       - Keyword
 *     summary: Get keywords by id
 *     description: Get all keywords by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Keyword object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Keyword'
 *       '404':
 *         description: Keyword not found
 *       '500':
 *         description: Internal server error
 */
keywordRoutes.get("/getById/:id", keywordController.getKeywordById);

// Will be used only as a service, not even a controller.
// keywordRoutes.post("/create", keywordController.createKeyword);

export default keywordRoutes;
