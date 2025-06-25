import { Model, DataTypes } from "sequelize";
import db from "../db/connection.js";

export default class UserSkill extends Model {}

UserSkill.init(
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
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "userSkills",
    sequelize: db,
  }
);
