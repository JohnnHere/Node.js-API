import { CreateComentarioController } from "../controllers/ComentarioControllers/CreateComentarioController";
import { Router } from "express";
import Container from "typedi";
import { DeleteComentarioController } from "../controllers/ComentarioControllers/DeleteComentarioController";
import { GetComentariosByVideoIdController } from "../controllers/ComentarioControllers/GetComentariosByVideoIdController";
import { UpdateComentarioController } from "controllers/ComentarioControllers/UpdateComentarioController";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";
import { middlewareAutenticacao } from "../middlewares/autenticacao";

const router = Router();

const createController = (): CreateComentarioController => {
  return Container.get<CreateComentarioController>(
    "CreateComentarioController"
  );
};
const deleteController = (): DeleteComentarioController => {
  return Container.get<DeleteComentarioController>(
    "DeleteComentarioController"
  );
};

const getComentariosByVideoIdController =
  (): GetComentariosByVideoIdController => {
    return Container.get<GetComentariosByVideoIdController>(
      "GetComentariosByVideoIdController"
    );
  };

const updateController = (): UpdateComentarioController => {
  return Container.get<UpdateComentarioController>(
    "UpdateComentarioController"
  );
};

const createRouter = () => {
  router.use(middlewareAutenticacao)
  router.post(
    "",
    errorHandlerWrapper((req, res) => createController().criar(req, res))
  );
  router.delete(
    "/:id",
    errorHandlerWrapper((req, res) => deleteController().remover(req, res))
  );
  router.get(
    "/:id",
    errorHandlerWrapper((req, res) =>
      getComentariosByVideoIdController().listar(req, res)
    )
  );
  router.patch("/:id",
    errorHandlerWrapper((req, res) => updateController().atualizar(req, res))
  );

  return router;
};

export default createRouter;
