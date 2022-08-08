import * as express from "express";
import { errorHandlers } from "../middlewares/errorHandlers";
import createRouters from "../routers";
import createMiddlewares from "./middlewares";

const createApp = (): express.Express => {
  const app = express();

  createMiddlewares(app);
  createRouters(app);
  errorHandlers(app);

  return app;
};

export default createApp;
