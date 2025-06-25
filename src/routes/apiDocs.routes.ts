import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

// Load JSON file without using import assertions
const openApiDoc = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "src/schemas/openapi.json"), "utf8")
);

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apiDocsRouter = express.Router();

apiDocsRouter.use("/", swaggerUi.serve);

apiDocsRouter.get(
  "/",
  swaggerUi.setup(openApiDoc, {
    swaggerOptions: {
      requestInterceptor: (req: any) => {
        req.headers["Cache-Control"] = "no-cache";
        return req;
      },
    },
  })
);

apiDocsRouter.use(
  "/openapi.json",
  express.static(path.join(__dirname, "../../schemas/openapi.json"))
);

export default apiDocsRouter;
