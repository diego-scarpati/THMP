import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db/connection";

export default class Keyword extends Model {}

Keyword.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    keyword: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: "keywords",
  }
);
