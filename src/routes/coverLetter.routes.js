import express from "express";
import * as coverLetterController from "../controllers/coverLetter.controller.js";

const coverLetterRoutes = express.Router();

coverLetterRoutes.get("/getAll", coverLetterController.getAllCoverLetters);
coverLetterRoutes.get("/getById/:id", coverLetterController.getCoverLetterById);
coverLetterRoutes.post("/create", coverLetterController.createCoverLetter);

export default coverLetterRoutes;
