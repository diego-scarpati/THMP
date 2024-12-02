import express from "express";
import morgan from "morgan";
import router from "./routes/index.routes.js";
import cors from "cors";
import db from "./db/connection.cjs";
import apiDocsRouter from "./routes/apiDocs.routes.cjs";

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
  } catch (error) {
    console.error("Unable to connect:", error.message);
  }
})();
