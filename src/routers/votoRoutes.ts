import { CreateVotoController } from "../controllers/VotoControllers/CreateVotoController";
import { DeleteVotoController } from "../controllers/VotoControllers/DeleteVotoController";
import { Router } from "express";
import Container from "typedi";
import { middlewareAutenticacao } from "../middlewares/autenticacao";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";

const router = Router();

const createController = (): CreateVotoController => {
  return Container.get<CreateVotoController>("CreateVotoController");
};

const deleteController = (): DeleteVotoController => {
  return Container.get<DeleteVotoController>("DeleteVotoController");
};

const createRouter = () => {
  router.use(middlewareAutenticacao)
  router.post("",
    errorHandlerWrapper((req, res) => createController().criar(req, res))
  );
  router.delete("",
    errorHandlerWrapper((req, res) => deleteController().remover(req, res))
  );

  return router;
};

export default createRouter;
