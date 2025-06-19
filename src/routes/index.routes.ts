import express from "express";
import jobRoutes from "./job.routes.ts";
import jobDescriptionRoutes from "./jobDescription.routes.ts";
import keywordRoutes from "./keyword.routes.ts";
import coverLetterRoutes from "./coverLetter.routes.ts";

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
