import router from "express/lib/router";
import * as jobDescriptionController from "../controllers/jobDescription.controller";

const jobDescriptionRoutes = router();

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
