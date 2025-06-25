import { Model, DataTypes } from "sequelize";
import db from "../db/connection.js";

export default class UserExclusion extends Model {}

UserExclusion.init(
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
    exclusionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "userExclusions",
    sequelize: db,
  }
);
