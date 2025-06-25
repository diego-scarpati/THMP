import { Sequelize, DataTypes } from "sequelize";
import db from "./connection.js";

const updateColumnDataType = async () => {
  const queryInterface = db.getQueryInterface();

  try {
    await queryInterface.changeColumn("JobDescriptions", "skills", {
      type: DataTypes.TEXT,
      allowNull: true,
    });

    console.log("Column updated successfully");
  } catch (error) {
    console.error("Error updating column:", error);
  }
};

const addColumnToTable = async () => {
  const queryInterface = db.getQueryInterface();
  try {
    await queryInterface.addColumn("Jobs", "postedBy", {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "LinkedIn",
    });
  } catch (error) {
    console.error("Error adding column:", error);
  }
};

addColumnToTable();
// updateColumnDataType();
