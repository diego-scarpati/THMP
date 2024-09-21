import express from 'express';
import * as jobController from "../controllers/job.controller.js";

const jobRoutes = express.Router();

jobRoutes.get("/getAll", jobController.getAllJobs);
jobRoutes.get("/getJobById/:id", jobController.getJobById);
jobRoutes.get("/getAllByAccepetance", jobController.getAllByAccepetance);
jobRoutes.get("/getAllByCoverLetter", jobController.getAllByCoverLetter);
jobRoutes.get("/getAllApplied", jobController.getAllApplied);
jobRoutes.get("/getAllRejected", jobController.getAllRejected);
jobRoutes.post("/create", jobController.createJob);
// jobRoutes.post("/bulkCreate", jobController.bulkCreate);
jobRoutes.patch("/update/:id", jobController.updateJob);

export default jobRoutes;
