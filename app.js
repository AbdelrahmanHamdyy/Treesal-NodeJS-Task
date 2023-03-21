import express from "express";
import bodyParser from "body-parser";
import sequelize from "./utils/database.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

try {
  await sequelize.sync();
  console.log("Connection has been established successfully.");
  app.listen(port, () => {
    console.log(`Started on port ${port}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default app;
