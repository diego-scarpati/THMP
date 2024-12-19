import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection.cjs";
import Job from "./Job.js";

const JobDescription = db.define("JobDescription", {
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
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  companyApplyUrl: {
    type: DataTypes.TEXT,
    // allowNull: false,
  },
  easyApplyUrl: {
    type: DataTypes.TEXT,
    // allowNull: false,
  },
  workRemoteAllowed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    // allowNull: false,
  },
  workPlace: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  formattedExperienceLevel: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  skills: {
    type: DataTypes.TEXT,
    // allowNull: false,
  },
});

export default JobDescription;
