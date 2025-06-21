import { Model, DataTypes } from "sequelize";
import db from "../db/connection";

export default class JobKeyword extends Model {}

JobKeyword.init(
  {
    id: {
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    jobId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keywordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "jobKeywords",
    sequelize: db,
  }
);
