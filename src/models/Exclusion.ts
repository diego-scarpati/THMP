import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db/connection.js";

export default class Exclusion extends Model {}

Exclusion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "exclusions",
  }
);
