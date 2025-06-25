import { Model, DataTypes } from "sequelize";
import db from "../db/connection.js";

export default class UserJob extends Model {}

UserJob.init(
  {
    id: {
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "userJobs",
    sequelize: db,
  }
);
