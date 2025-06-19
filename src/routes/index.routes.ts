import express from "express";
import jobRoutes from "./job.routes";
import jobDescriptionRoutes from "./jobDescription.routes";
import keywordRoutes from "./keyword.routes";
import coverLetterRoutes from "./coverLetter.routes";

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
