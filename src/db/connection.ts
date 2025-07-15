import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface Env {
  DATABASE_URL?: string;
}

const { DATABASE_URL } = process.env as Env;

const db: Sequelize = new Sequelize(DATABASE_URL ?? "", {
  logging: false,
  native: false,
  pool: {
    max: 20, // 🚀 start with 20–30 if you're doing job scraping
    min: 0,
    acquire: 30000, // 30 sec wait before timeout
    idle: 10000,
  },
});

export default db;
