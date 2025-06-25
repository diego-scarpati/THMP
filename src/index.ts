import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.routes.js";
import db from "./db/connection.js";
import apiDocsRouter from "./routes/apiDocs.routes.js";

const app = express();
const port = 8888;
const corsOptions = {
  credentials: true,
  origin: "*",
};

app.use(morgan("dev"));

app.use(express.json());

app.use(cors(corsOptions));

app.use("/api", router);

app.use("/api-docs", apiDocsRouter);

(async () => {
  try {
    await db.sync({ force: false });
    app.listen(port, () => {
      console.log(`Listening on Port: ${port}`);
    });
  } catch (error: unknown) {
    console.error("Unable to connect:", error instanceof Error ? error.message : String(error));
  }
})();
