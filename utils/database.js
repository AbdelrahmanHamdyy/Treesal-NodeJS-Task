import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.DB_HOST;
const NAME = process.env.DB_NAME;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(NAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  logging: false,
});

export default sequelize;
