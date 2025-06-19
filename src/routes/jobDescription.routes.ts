import express from "express";
import * as jobDescriptionController from "../controllers/jobDescription.controller.ts";

const jobDescriptionRoutes = express.Router();

/**
 * @swagger
 * /api/jobDescriptions/getAll:
 *   get:
 *     tags:
 *       - Job Description
 *     summary: Get all job descriptions
 *     description: Get all job descriptions
 *     responses:
 *       '200':
 *         description: A list of job descriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobDescription'
 *       '500':
 *         description: Internal server error
 */
jobDescriptionRoutes.get("/getAll", jobDescriptionController.getAllJobDescriptions);

/**
 * @swagger
 * /api/jobDescriptions/getAll/:id:
 *   get:
 *     tags:
 *       - Job Description
 *     summary: Get job description by id
 *     description: Get job description by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job Description ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Job description object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobDecription'
 *       '404':
 *         description: Job description not found
 *       '500':
 *         description: Internal server error
 */
jobDescriptionRoutes.get("/getById/:id", jobDescriptionController.getJobDescriptionById);
jobDescriptionRoutes.post("/create", jobDescriptionController.createJobDescription);

/**
 * @swagger
 * /api/jobDescriptions/loopAndCreate:
 *   post:
 *     tags:
 *       - Job Description
 *     summary: Search, create job descriptions and loop
 *     description: Searches for the specific job descriptions and creates them after being filtered by some custom formulas.
 *     responses:
 *       '200':
 *         description: Job object
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Job descriptions created: 5 out of 10. 0 job descriptions already created."
 *       '400':
 *         description: Missing query params
 *       '500':
 *         description: Internal server error
 */
jobDescriptionRoutes.post("/loopAndCreate", jobDescriptionController.loopAndCreateJobDescription);

export default jobDescriptionRoutes;
