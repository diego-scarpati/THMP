import router from "express/lib/router";
import * as coverLetterController from "../controllers/coverLetter.controller";

const coverLetterRoutes = router();

coverLetterRoutes.get("/getAll", coverLetterController.getAllCoverLetters);
coverLetterRoutes.get("/getById/:id", coverLetterController.getCoverLetterById);
coverLetterRoutes.post("/create", coverLetterController.createCoverLetter);

export default coverLetterRoutes;
