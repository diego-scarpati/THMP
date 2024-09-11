import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection";

const Keyword = db.define("Keyword", {
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
});

export default Keyword;