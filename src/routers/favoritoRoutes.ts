import { CreateFavoritosController } from "../controllers/FavoritoControllers/CreateFavoritosController";
import { Router } from "express";
import Container from "typedi";
import { DeleteFavoritoController } from "../controllers/FavoritoControllers/DeleteFavoritoController";
import { GetFavoritosByUserIdController } from "../controllers/FavoritoControllers/GetFavoritosByUserIdController";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";
import { middlewareAutenticacao } from "../middlewares/autenticacao";
const router = Router();

const createController = (): CreateFavoritosController => {
  return Container.get<CreateFavoritosController>("CreateFavoritosController");
};

const deleteController = (): DeleteFavoritoController => {
  return Container.get<DeleteFavoritoController>("DeleteFavoritoController");
};

const getFavoritosByUserIdController = (): GetFavoritosByUserIdController => {
  return Container.get<GetFavoritosByUserIdController>(
    "GetFavoritosByUserIdController"
  );
};

const createRouter = () => {
  router.use(middlewareAutenticacao)
  router.post(
    "",
    errorHandlerWrapper((req, res) => createController().criar(req, res))
  );
  router.delete("",
    errorHandlerWrapper((req, res) => deleteController().remover(req, res))
  );
  router.get("/:alunoId",
    errorHandlerWrapper((req, res) => getFavoritosByUserIdController().listar(req, res))
  );

  return router;
};

export default createRouter;
