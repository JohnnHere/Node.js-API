import { CreateMateriaController } from "../controllers/MateriaControllers/CreateMateriaController";
import { DeleteMateriaController } from "../controllers/MateriaControllers/DeleteMateriaController";
import { GetAllMateriasController } from "../controllers/MateriaControllers/GetAllMateriasController";
import { Router } from "express";
import Container from "typedi";
import { middlewareAutorizacaoProfessorEAdmin } from "../middlewares/autorizacaoProfessorEAdmin";
import { middlewareAutenticacao } from "../middlewares/autenticacao";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";

const router = Router();

const createController = (): CreateMateriaController => {
  return Container.get<CreateMateriaController>("CreateMateriaController");
};

const deleteController = (): DeleteMateriaController => {
  return Container.get<DeleteMateriaController>("DeleteMateriaController");
};

const getAllMateriasController = (): GetAllMateriasController => {
  return Container.get<GetAllMateriasController>("GetAllMateriasController");
};

const createRouter = () => {
  router.use(middlewareAutenticacao);
  router.get("",
    errorHandlerWrapper((req, res) => getAllMateriasController().listar(req, res))
  );
  router.post("", middlewareAutorizacaoProfessorEAdmin,
    errorHandlerWrapper((req, res) => createController().criar(req, res))
  );
  router.delete("/:id", middlewareAutorizacaoProfessorEAdmin,
    errorHandlerWrapper((req, res) => deleteController().remover(req, res))
  );
  return router;
};

export default createRouter;
