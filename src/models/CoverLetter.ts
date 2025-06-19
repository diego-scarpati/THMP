import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Job from "./Job";

export default class CoverLetter extends Model {}

CoverLetter.init(
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
    keyword: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "coverLetters",
  }
);
