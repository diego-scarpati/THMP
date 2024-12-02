const path = require("path");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
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

module.exports = apiDocsRouter;
