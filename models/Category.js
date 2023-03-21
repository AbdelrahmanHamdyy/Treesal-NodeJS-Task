import { Sequelize } from "sequelize";
import sequelize from "../utils/database";

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  arabic_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  english_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.STRING,
  },
  view_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  updated_at: {
    type: Sequelize.DATE,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
});

export default Category;
