import express from "express";
import * as jobController from "../controllers/job.controller.js";

const jobRoutes = express.Router();

/**
 * @swagger
 * /api/jobs/getAll:
 *   get:
 *     tags:
 *       - Job
 *     summary: Get all jobs
 *     description: Get all jobs
 *     responses:
 *       '200':
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       '500':
 *         description: Internal server error
 */
jobRoutes.get("/getAll", jobController.getAllJobs);

jobRoutes.get(
  "/getAllWithDescription",
  jobController.getAllJobsWithDescription
);
jobRoutes.get("/getJobById/:id", jobController.getJobById);
// jobRoutes.get("/getAllByAccepetance", jobController.getAllByAccepetance);
// jobRoutes.get("/getAllByCoverLetter", jobController.getAllByCoverLetter);
// jobRoutes.get("/getAllApplied", jobController.getAllApplied);
// jobRoutes.get("/getAllRejected", jobController.getAllRejected);
jobRoutes.post("/searchAndCreate", jobController.searchAndCreateJobs);
// jobRoutes.post("/bulkCreate", jobController.bulkCreate);
jobRoutes.patch("/update/:id", jobController.updateJob);
jobRoutes.patch("/approveByGPT", jobController.approveByGPT);
jobRoutes.get("/saveJobsToFile", jobController.saveJobsToFile);

export default jobRoutes;
