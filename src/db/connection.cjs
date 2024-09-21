// import dotenv from "dotenv";
// import path from "path";
// import { Sequelize } from "sequelize";
const dotenv = require("dotenv");
const path = require("path");
const { Sequelize } = require("sequelize");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { DATABASE_URL } = process.env;

const db = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
});

module.exports = db