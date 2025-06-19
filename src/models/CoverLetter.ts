import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection.ts";
import Job from "./Job.ts";

const CoverLetter = db.define("CoverLetter", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Job, // This table references Job
      key: "id", // References Job.id
    },
    onDelete: "CASCADE", // Optional: Cascade deletes
    onUpdate: "CASCADE", // Optional: Cascade updates
  },
  keyword: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default CoverLetter;
