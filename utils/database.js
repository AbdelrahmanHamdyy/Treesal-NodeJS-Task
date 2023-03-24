import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let DB_NAME;

if (process.env.NODE_ENV.trim() === "testing") {
  DB_NAME = process.env.DB_NAME_TESTING;
} else {
  DB_NAME = process.env.DB_NAME;
}

const HOST = process.env.DB_HOST;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  logging: false,
});

export default sequelize;
