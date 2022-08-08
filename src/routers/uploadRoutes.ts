import { Router } from "express";
import { UploadImagemController } from "../controllers/UploadControllers/UploadImagemController";
import { UploadVideoController } from "../controllers/UploadControllers/UploadVideoController";
import * as multer from "multer";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";
import { middlewareAutenticacao } from "../middlewares/autenticacao";
import { middlewareAutorizacaoProfessorEAdmin } from "../middlewares/autorizacaoProfessorEAdmin";

const router = Router();
const upload = multer({ dest: "./uploads" });

const createRouter = () => {
  router.post(
    "/imagem",
    upload.single("file"),
    errorHandlerWrapper(new UploadImagemController().upload)
  );
  router.post(
    "/video",
    middlewareAutenticacao,
    middlewareAutorizacaoProfessorEAdmin,
    upload.single("file"),
    errorHandlerWrapper(new UploadVideoController().upload)
  );

  return router;
};

export default createRouter;
