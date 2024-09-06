import { Sequelize, DataTypes } from "sequelize";
import db from "../db/connection";

const CoverLetter = db.define("CoverLetter", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  keyword: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default CoverLetter;