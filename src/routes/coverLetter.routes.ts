import express from "express";
import * as coverLetterController from "../controllers/coverLetter.controller.ts";

const coverLetterRoutes = express.Router();

/**
 * @swagger
 * /api/coverLetters/getAll:
 *   get:
 *     tags:
 *       - Cover Letter
 *     summary: Get all Cover Letters
 *     description: Get all Cover Letters
 *     responses:
 *       '200':
 *         description: A list of Cover Letters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoverLetter'
 *       '500':
 *         description: Internal server error
 */
coverLetterRoutes.get("/getAll", coverLetterController.getAllCoverLetters);

/**
 * @swagger
 * /api/coverLetter/getAll/:id:
 *   get:
 *     tags:
 *       - Cover Letter
 *     summary: Get Cover Letter by id
 *     description: Get all Cover Letter by id
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
 *         description: CoverLetter object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoverLetter'
 *       '404':
 *         description: Cover Letter not found
 *       '500':
 *         description: Internal server error
 */
coverLetterRoutes.get("/getById/:id", coverLetterController.getCoverLetterById);

// Will be used only as a service, not even a controller.
// coverLetterRoutes.post("/create", coverLetterController.createCoverLetter);

export default coverLetterRoutes;
