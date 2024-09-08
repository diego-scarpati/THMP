import router from "express/lib/router";
import * as jobController from "../controllers/job.controller";

const jobRoutes = router();

jobRoutes.get("/getAll", jobController.getAllJobs);
jobRoutes.get("/getJobById/:id", jobController.getJobById);
jobRoutes.get("/getAllByAccepetance", jobController.getAllByAccepetance);
jobRoutes.get("/getAllByCoverLetter", jobController.getAllByCoverLetter);
jobRoutes.get("/getAllApplied", jobController.getAllApplied);
jobRoutes.get("/getAllRejected", jobController.getAllRejected);
jobRoutes.post("/create", jobController.createJob);
jobRoutes.post("/bulkCreate", jobController.bulkCreate);
jobRoutes.patch("/update/:id", jobController.updateJob);

export default jobRoutes;
