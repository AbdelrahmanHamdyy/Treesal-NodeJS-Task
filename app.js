import express from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import sequelize from "./utils/database.js";
import mainRouter from "./routes/router.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Swagger Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Treesal",
      version: "1.0.0",
      description: "API-Documentation",
    },
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(mainRouter);

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
