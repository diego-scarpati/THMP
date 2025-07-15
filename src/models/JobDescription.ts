import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db/connection.js";
import Job from "./Job.js";

export default class JobDescription extends Model {}

JobDescription.init(
  {
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
  },
  {
    sequelize: db,
    tableName: "jobDescriptions",
  }
);
