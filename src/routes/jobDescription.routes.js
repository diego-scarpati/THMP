import router from "express/lib/router";

const jobDescriptionRoutes = router();

jobDescriptionRoutes.get("/getAll")
jobDescriptionRoutes.get("/findById")
// jobDescriptionRoutes.get("/getAllByAccepetance")
// jobDescriptionRoutes.get("/getAllByCoverLetter")
// jobDescriptionRoutes.get("/getAllApplied")
// jobDescriptionRoutes.get("/getAllRejected")
jobDescriptionRoutes.post("/create")
// jobDescriptionRoutes.post("/bulkCreate")
// jobDescriptionRoutes.patch("/update")

export default jobDescriptionRoutes;