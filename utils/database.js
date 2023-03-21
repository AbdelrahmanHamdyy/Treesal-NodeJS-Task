import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_db", "user2", "hRMyzHVgtWgDJAwe", {
  host: "18.157.127.87",
  dialect: "mysql",
});

module.exports = sequelize;
