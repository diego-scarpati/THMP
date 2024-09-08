import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection";

const JobDescription = db.define("JobDescription", {
  id: {
    type: DataTypes.INTEGER,
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
  workPlace: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
});

export default JobDescription;
