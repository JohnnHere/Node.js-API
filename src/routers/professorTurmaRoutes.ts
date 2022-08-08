import { CreateProfessorTurmaController } from "../controllers/ProfessorTurmaControllers/CreateProfessorTurmaController";
import { Router } from "express";
import Container from "typedi";
import { DeleteProfessorTurmaController } from "../controllers/ProfessorTurmaControllers/DeleteProfessorTurmaController";
import { GetProfessorTurmaByProfessorIdController } from "../controllers/ProfessorTurmaControllers/GetProfessorTurmaByProfessorIdController";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";
import { middlewareAutenticacao } from "../middlewares/autenticacao";
import { middlewareAutorizacaoAdmin } from "../middlewares/autorizacaoAdmin";
const router = Router();

const createController = (): CreateProfessorTurmaController => {
  return Container.get<CreateProfessorTurmaController>(
    "CreateProfessorTurmaController"
  );
};

const deleteController = (): DeleteProfessorTurmaController => {
  return Container.get<DeleteProfessorTurmaController>(
    "DeleteProfessorTurmaController"
  );
};

const getProfessorTurmaByProfessorIdController =
  (): GetProfessorTurmaByProfessorIdController => {
    return Container.get<GetProfessorTurmaByProfessorIdController>(
      "GetProfessorTurmaByProfessorIdController"
    );
  };

const createRouter = () => {
  router.use(middlewareAutenticacao)
  router.use(middlewareAutorizacaoAdmin)
  router.post(
    "",
    errorHandlerWrapper((req, res) => createController().criar(req, res))
  );
  router.delete("",
    errorHandlerWrapper((req, res) => deleteController().remover(req, res))
  );
  router.get("/:professorId",
    errorHandlerWrapper((req, res) => getProfessorTurmaByProfessorIdController().listar(req, res))
  );

  return router;
};

export default createRouter;
