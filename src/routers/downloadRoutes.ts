import { DownloadController } from "../controllers/DownloadControllers/DownloadController";
import { Router } from "express";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";


const router = Router();

const createRouter = () => {
  router.get("", errorHandlerWrapper(new DownloadController().download));

  return router;
};

export default createRouter;
