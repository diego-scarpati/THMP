import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection.cjs";

const JobDescription = db.define("JobDescription", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
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
    type: DataTypes.STRING,
    // allowNull: false,
  },
  easyApplyUrl: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    // allowNull: false,
  },
});

export default JobDescription;
