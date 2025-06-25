import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db/connection.js";

export default class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, // Changed from 'lastName' to 'last_name' for consistency
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures that email addresses are unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Passwords should not be null
    },
  },
  {
    sequelize: db,
    tableName: "users",
  }
);
