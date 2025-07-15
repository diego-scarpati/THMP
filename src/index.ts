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
    // update the database schema if needed
    await db.authenticate();
    console.log("Database connection has been established successfully.");
    // Sync the models with the database
    // If you want to force sync, set force: true, but be careful as it will drop existing tables
    // await db.sync({ force: true }); // Uncomment this line to force sync the database
    // If you want to avoid dropping existing tables, set force: false
    // await db.sync({ force: false }); // This will not drop existing tables
    await db.sync({ force: false });
    app.listen(port, () => {
      console.log(`Listening on Port: ${port}`);
    });
  } catch (error: unknown) {
    console.error("Unable to connect:", error instanceof Error ? error.message : String(error));
  }
})();
