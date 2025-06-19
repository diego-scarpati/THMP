import { Sequelize } from "sequelize";
import db from "./connection";

const updateColumnDataType = async () => {
  const queryInterface = db.getQueryInterface();

  try {
    await queryInterface.changeColumn("JobDescriptions", "skills", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    console.log("Column updated successfully");
  } catch (error) {
    console.error("Error updating column:", error);
  }
};

updateColumnDataType();
