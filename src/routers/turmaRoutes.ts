import { CreateTurmaController } from "../controllers/TurmaControllers/CreateTurmaController";
import { GetTurmaController } from "../controllers/TurmaControllers/GetTurmaController";
import { ListTurmaController } from "../controllers/TurmaControllers/ListTurmaController";
import { DeleteTurmaController } from "../controllers/TurmaControllers/DeleteTurmaController";
import { UpdateTurmaController } from "../controllers/TurmaControllers/UpdateTurmaController";
import { Router } from "express";
import Container from "typedi";
import { middlewareAutorizacaoAdmin } from "../middlewares/autorizacaoAdmin";
import { middlewareAutenticacao } from "../middlewares/autenticacao";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";

const router = Router();

const listController = (): ListTurmaController => {
  return Container.get<ListTurmaController>("ListTurmaController");
};
const createController = (): CreateTurmaController => {
  return Container.get<CreateTurmaController>("CreateTurmaController");
};
const getController = (): GetTurmaController => {
  return Container.get<GetTurmaController>("GetTurmaController");
};
const updateController = (): UpdateTurmaController => {
  return Container.get<UpdateTurmaController>("UpdateTurmaController");
};
const deleteController = (): DeleteTurmaController => {
  return Container.get<DeleteTurmaController>("DeleteTurmaController");
};

const createRouter = () => {
  router.get("", (req, res) => listController().listar(req, res));
  router.use(middlewareAutenticacao);
  router.post("", middlewareAutorizacaoAdmin,
    errorHandlerWrapper((req, res) => createController().criar(req, res))
  );
  router.get("/:id",
    errorHandlerWrapper((req, res) => getController().get(req, res))
  );
  router.put("/:id", middlewareAutorizacaoAdmin,
    errorHandlerWrapper((req, res) => updateController().atualizar(req, res))
  );
  router.delete("/:id", middlewareAutorizacaoAdmin,
    errorHandlerWrapper((req, res) => deleteController().remove(req, res))
  );

  return router;
};

export default createRouter;
