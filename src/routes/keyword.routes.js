import express from "express";
import * as keywordController from "../controllers/keyword.controller.js";

const keywordRoutes = express.Router();

keywordRoutes.get("/getAll", keywordController.getAllKeywords);
keywordRoutes.get("/getById/:id", keywordController.getKeywordById);
keywordRoutes.post("/create", keywordController.createKeyword);

export default keywordRoutes;
