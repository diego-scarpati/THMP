import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db/connection.js";

export default class Application extends Model {}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    approvedByFormula: {
      type: DataTypes.ENUM,
      values: ["yes", "no"],
      defaultValue: "no",
    },
  },
  {
    sequelize: db,
    tableName: "applications",
  }
);
