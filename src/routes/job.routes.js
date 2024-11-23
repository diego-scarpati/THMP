import express from "express";
import * as jobController from "../controllers/job.controller.js";

const jobRoutes = express.Router();

jobRoutes.get("/getAll", jobController.getAllJobs);
jobRoutes.get(
  "/getAllWithDescription",
  jobController.getAllJobsWithDescription
);
jobRoutes.get("/getJobById/:id", jobController.getJobById);
jobRoutes.get("/getAllByAccepetance", jobController.getAllByAccepetance);
jobRoutes.get("/getAllByCoverLetter", jobController.getAllByCoverLetter);
jobRoutes.get("/getAllApplied", jobController.getAllApplied);
jobRoutes.get("/getAllRejected", jobController.getAllRejected);
jobRoutes.post("/searchAndCreate", jobController.searchAndCreateJobs);
// jobRoutes.post("/bulkCreate", jobController.bulkCreate);
jobRoutes.patch("/update/:id", jobController.updateJob);
jobRoutes.patch("/approveByGPT", jobController.approveByGPT);
jobRoutes.get("/saveJobsToFile", jobController.saveJobsToFile);

export default jobRoutes;
