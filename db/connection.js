import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const db = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default db;