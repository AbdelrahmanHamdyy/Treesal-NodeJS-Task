import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";

const Store = sequelize.define(
  "store",
  {
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
    fb_store_url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    insta_store_url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Category",
        key: "id",
      },
    },
    contact_person_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contact_person_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Store;
