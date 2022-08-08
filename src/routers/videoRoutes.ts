import { CreateVideoController } from "../controllers/VideoControllers/CreateVideoController";
import { DeleteVideoController } from "../controllers/VideoControllers/DeleteVideoController";
import { GetAllVideosController } from "../controllers/VideoControllers/GetAllVideosController";
import { GetVideoByIdController } from "../controllers/VideoControllers/GetVideoByIdController";
import { GetVideosSugeridosByVideoIdController } from "../controllers/MateriaControllers/GetVideosSugeridosByVideoIdController";
import { UpdateVideoController } from "../controllers/VideoControllers/UpdateVideoController";
import { GetVideosPublicosController } from "../controllers/VideoControllers/GetVideosPublicosController";
import { GetVideosByTurmaIdController } from "../controllers/VideoControllers/GetVideosByTurmaIdController";
import { Router } from "express";
import Container from "typedi";
import { middlewareAutorizacaoProfessorEAdmin } from "../middlewares/autorizacaoProfessorEAdmin";
import { middlewareAutorizacaoAdmin } from "../middlewares/autorizacaoAdmin";
import { middlewareAutenticacao } from "../middlewares/autenticacao";

const router = Router();

const createController = (): CreateVideoController => {
  return Container.get<CreateVideoController>("CreateVideoController");
};
const deleteController = (): DeleteVideoController => {
  return Container.get<DeleteVideoController>("DeleteVideoController");
};
const getAllVideosController = (): GetAllVideosController => {
  return Container.get<GetAllVideosController>("GetAllVideosController");
};
const getVideoByIdController = (): GetVideoByIdController => {
  return Container.get<GetVideoByIdController>("GetVideoByIdController");
};
const videosSugeridosByVideoIdController =
  (): GetVideosSugeridosByVideoIdController => {
    return Container.get<GetVideosSugeridosByVideoIdController>(
      "GetVideosSugeridosByVideoIdController"
    );
  };
const updateVideoController = (): UpdateVideoController => {
  return Container.get<UpdateVideoController>("UpdateVideoController");
};
const getVideosPublicosController = (): GetVideosPublicosController => {
  return Container.get<GetVideosPublicosController>(
    "GetVideosPublicosController"
  );
};

const getVideosByTurmaIdController = (): GetVideosByTurmaIdController => {
  return Container.get<GetVideosByTurmaIdController>(
    "GetVideosByTurmaIdController"
  );
};

const createRouter = () => {
  router.get("/publicos", (req, res) =>
    getVideosPublicosController().listarVideosPublicos(req, res)
  );

  router.use(middlewareAutenticacao);

  router.post("", middlewareAutorizacaoProfessorEAdmin, (req, res) =>
    createController().criar(req, res)
  );
  router.delete("/:id", middlewareAutorizacaoProfessorEAdmin, (req, res) =>
    deleteController().remover(req, res)
  );
  router.get("", middlewareAutorizacaoAdmin, (req, res) =>
    getAllVideosController().listar(req, res)
  );
  router.get("/:id", (req, res) => getVideoByIdController().buscar(req, res));
  router.get("/:id/recomendados", (req, res) =>
    videosSugeridosByVideoIdController().listarRecomendados(req, res)
  );
  router.get("/turma/:turmaId", (req, res) =>
    getVideosByTurmaIdController().listar(req, res)
  );
  router.put("/:id",
    middlewareAutorizacaoProfessorEAdmin,
    (req, res) => updateVideoController().atualizar(req, res));

  return router;
};

export default createRouter;
