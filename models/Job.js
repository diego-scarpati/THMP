import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection";

const Job = db.define("Job", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
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
    allowNull: false,
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
});

export default Job;
