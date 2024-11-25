import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection.cjs";

const CoverLetter = db.define("CoverLetter", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  keyword: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default CoverLetter;