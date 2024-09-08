import router from "express/lib/router";

const coverLetterRoutes = router();

coverLetterRoutes.get("/getAll")
coverLetterRoutes.get("/findById")
coverLetterRoutes.post("/create")

export default coverLetterRoutes;