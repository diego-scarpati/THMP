import path from "path";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

const openApiDoc = require("../schemas/openapi.json");

const apiDocsRouter = express.Router();

apiDocsRouter.use("/", swaggerUi.serve);
apiDocsRouter.get(
  "/",
  swaggerUi.setup(openApiDoc, {
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.headers["Cache-Control"] = "no-cache";
        return req;
      },
    },
  })
);

// (optional) serve the OpenAPI specification
apiDocsRouter.use(
  "/openapi.json",
  express.static(path.join(__dirname, "../../schemas/openapi.json"))
);

export default apiDocsRouter;
