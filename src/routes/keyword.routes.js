import router from "express/lib/router";

const keywordRoutes = router();

keywordRoutes.get("/getAll")
keywordRoutes.get("/findById")
keywordRoutes.post("/create")

export default keywordRoutes;