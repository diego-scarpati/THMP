import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection";
import Job from "./Job";

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
  },
  easyApplyUrl: {
    type: DataTypes.TEXT,
  },
  workRemoteAllowed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  workPlace: {
    type: DataTypes.STRING,
  },
  formattedExperienceLevel: {
    type: DataTypes.STRING,
  },
  skills: {
    type: DataTypes.TEXT,
  },
});

export default JobDescription;
