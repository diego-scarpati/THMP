import express from 'express';
import * as jobDescriptionController from "../controllers/jobDescription.controller.js";

const jobDescriptionRoutes = express.Router();

jobDescriptionRoutes.get(
  "/getAll",
  jobDescriptionController.getAllJobDescriptions
);
jobDescriptionRoutes.get(
  "/getById/:id",
  jobDescriptionController.getJobDescriptionById
);
jobDescriptionRoutes.post(
  "/create",
  jobDescriptionController.createJobDescription
);

export default jobDescriptionRoutes;
