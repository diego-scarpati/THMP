import router from "express/lib/router";
import * as keywordController from "../controllers/keyword.controller";

const keywordRoutes = router();

keywordRoutes.get("/getAll", keywordController.getAllKeywords);
keywordRoutes.get("/getById/:id", keywordController.getKeywordById);
keywordRoutes.post("/create", keywordController.createKeyword);

export default keywordRoutes;
