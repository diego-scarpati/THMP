import express from "express";
import jobRoutes from "./job.routes.js";
import jobDescriptionRoutes from "./jobDescription.routes.js";
import keywordRoutes from "./keyword.routes.js";
import coverLetterRoutes from "./coverLetter.routes.js";

const router = express.Router();

const routes = [
  {
    path: "/jobs",
    router: jobRoutes,
  },
  {
    path: "/jobDescriptions",
    router: jobDescriptionRoutes,
  },
  {
    path: "/keywords",
    router: keywordRoutes,
  },
  {
    path: "/coverLetters",
    router: coverLetterRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
