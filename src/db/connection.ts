import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface Env {
  DATABASE_URL?: string;
}

const { DATABASE_URL } = process.env as Env;

const db: Sequelize = new Sequelize(DATABASE_URL ?? "", {
  logging: false,
  native: false,
});

export default db;
