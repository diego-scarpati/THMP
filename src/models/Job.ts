import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db/connection.js";

export default class Job extends Model {}

// const Job = db.define("Job", {
Job.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceId: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    posterId: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    postDate: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    benefits: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    approvedByFormula: {
      type: DataTypes.ENUM,
      values: ["yes", "no", "pending"],
      defaultValue: "pending",
    },
    approvedByGPT: {
      type: DataTypes.ENUM,
      values: ["yes", "no", "pending"],
      defaultValue: "pending",
    },
    easyApply: {
      type: DataTypes.ENUM,
      values: ["yes", "no", "pending"],
      defaultValue: "pending",
    },
    postedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "LinkedIn",
    },
  },
  {
    sequelize: db,
    tableName: "jobs",
  }
);
