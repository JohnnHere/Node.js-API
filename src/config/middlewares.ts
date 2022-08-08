import * as express from "express";
import * as cors from "cors";
import { json } from "body-parser";
import * as morgan from "morgan";
import { serve, setup } from "swagger-ui-express";
import * as YAML from "yamljs";

const createMiddlewares = (app: express.Express) => {
  app.use(cors());
  app.use(json({ limit: "5mb" }));
  app.use(morgan("dev"));
  app.use("/docs", serve, setup(YAML.load("src/config/swagger.yaml")));
};

export default createMiddlewares;
