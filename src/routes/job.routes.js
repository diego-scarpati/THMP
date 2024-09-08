import router from "express/lib/router";
import * as jobController from "../controllers/job.controller"

const jobRoutes = router();

jobRoutes.get("/getAll", jobController.getAllJobs)
jobRoutes.get("/getJobById")
jobRoutes.get("/getAllByAccepetance")
jobRoutes.get("/getAllByCoverLetter")
jobRoutes.get("/getAllApplied")
jobRoutes.get("/getAllRejected")
jobRoutes.post("/create")
jobRoutes.post("/bulkCreate")
jobRoutes.patch("/update/:id")

export default jobRoutes;