import express from "express";
import storeRouter from "./stores.js";
import categoryRouter from "./categories.js";

const mainRouter = express.Router();

mainRouter.use(storeRouter);
mainRouter.use(categoryRouter);

mainRouter.use((req, res) => {
  res.status(404).json(`Can't ${req.method} ${req.url}`);
});

export default mainRouter;
