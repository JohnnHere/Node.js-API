import { Router } from "express";
import { middlewareAutenticacao } from "../middlewares/autenticacao";
import Container from "typedi";
import { AddHistoricoController } from "../controllers/HistoricoControllers/AddHistoricoController";
import { GetHistoricoByUserIdController } from "../controllers/HistoricoControllers/GetHistoricoByUserIdController";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";
const router = Router();

const addHistoricoController = (): AddHistoricoController => {
  return Container.get<AddHistoricoController>("AddHistoricoController");
};

const getHistoricoByUserIdController = (): GetHistoricoByUserIdController => {
  return Container.get<GetHistoricoByUserIdController>(
    "GetHistoricoByUserIdController"
  );
};

const createRouter = () => {
  router.use(middlewareAutenticacao);
  router.post(
    "",
    errorHandlerWrapper((req, res) =>
      addHistoricoController().adicionar(req, res)
    )
  );
  router.get("/:alunoId",
    errorHandlerWrapper((req, res) => getHistoricoByUserIdController().listar(req, res))
  );

  return router;
};

export default createRouter;
