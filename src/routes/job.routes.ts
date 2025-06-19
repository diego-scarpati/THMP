import express from "express";
import * as jobController from "../controllers/job.controller.ts";

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
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of jobs
 *                   example: 10
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       '500':
 *         description: Internal server error
 */
jobRoutes.get("/getAll", jobController.getAllJobs);

// jobRoutes.get(
//   "/getAllWithDescription",
//   jobController.getAllJobsWithDescription
// );

/**
 * @swagger
 * /api/jobs/getJobById/:id:
 *   get:
 *     tags:
 *       - Job
 *     summary: Get job by id
 *     description: Get job by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Job object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       '404':
 *         description: Job not found
 *       '500':
 *         description: Internal server error
 */

jobRoutes.get("/getJobById/:id", jobController.getJobById);
/**
 * @swagger
 * /api/jobs/getJobsByCompanyName/:companyName:
 *   get:
 *     tags:
 *       - Job
 *     summary: Get job by company name
 *     description: Get job by company name
 *     parameters:
 *       - name: companyName
 *         in: path
 *         description: Company name
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *     responses:
 *       '200':
 *         description: Job object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       '404':
 *         description: Job not found
 *       '500':
 *         description: Internal server error
 */
jobRoutes.get("/getJobsByCompanyName/:companyName", jobController.getJobsByCompanyName);

// jobRoutes.get("/getAllByAccepetance", jobController.getAllByAccepetance);
// jobRoutes.get("/getAllByCoverLetter", jobController.getAllByCoverLetter);
// jobRoutes.get("/getAllApplied", jobController.getAllApplied);
// jobRoutes.get("/getAllRejected", jobController.getAllRejected);

/**
 *
 * @param {* string keywords related to the position } keywords
 * @param {* number id of the location you're looking for a job} locationId
 * @param {* string it could be one of these; anyTime, pastMonth, pastWeek, past24Hours} datePosted
 * @param {* string mostRelevant or mostRecent} sort
 * @param {* string it could be one of these: onSite, remote, hybrid} onsiteRemote
 * @param {* string (optional) it could be one of these: 0, 25, 50, 75, 100, etc. The maximum number of start is 975} start
 * @param {* string (optional) it could be one of these: internship, associate, director, entryLevel, midSeniorLevel.} experienceLevel
 */

/**
 * @swagger
 * /api/jobs/searchAndCreate:
 *   post:
 *     tags:
 *       - Job
 *     summary: Search and create jobs
 *     description: Searches for jobs based on the keywords and creates them in the database
 *     parameters:
 *       - name: keywords
 *         in: path
 *         description: Keywords to search for
 *         required: true
 *         schema:
 *           type: string
 *           example: "software engineer"
 *       - name: locationId
 *         in: path
 *         description: Location ID to search for jobs
 *         required: false
 *         schema:
 *           type: number
 *           example: 104769905 (Sydney, Australia)
 *           default: 104769905
 *     responses:
 *       '201':
 *         description: Job object
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Created 25 jobs out of 25"
 *       '400':
 *         description: Missing query params
 *       '500':
 *         description: Internal server error
 */
jobRoutes.post("/searchAndCreate", jobController.searchAndCreateJobs);

jobRoutes.post("/searchAndCreateWithAllKeywords", jobController.searchAndCreateWithAllKeywords);
// jobRoutes.post("/bulkCreate", jobController.bulkCreate);

// jobRoutes.patch("/update/:id", jobController.updateJob);

/**
 * @swagger
 * /api/jobs/approveByGPT:
 *   patch:
 *     tags:
 *       - Job
 *     summary: Approve jobs by GPT
 *     description: Route that checks on jobs that are pending approval by GPT, are easy to apply to, have been approved by the formula. According to an uploaded resume and the job description, the job is approved or rejected by chatgpt model 4 turbo.
 *     responses:
 *       '200':
 *         description: Job object
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Jobs approved: 5 out of 10"
 *       '500':
 *         description: Internal server error
 */
jobRoutes.patch("/approveByGPT", jobController.approveByGPT);

// Update jobs with the approveByFormula function
jobRoutes.patch("/approveByFormula", jobController.approveByFormula);
// Update those jobs that are "old" or have already applied to
jobRoutes.patch("/updateApprovedByDate", jobController.updateApprovedByDate);
// Only to filterOut those jobs with titles that are not related to the specific purpose of the app
jobRoutes.patch("/filterByJobTitle", jobController.filterByJobTitle);
jobRoutes.get("/saveJobsToFile", jobController.saveJobsToFile);

export default jobRoutes;
