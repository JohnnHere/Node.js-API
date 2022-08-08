import * as express from "express";
import createVideoRouter from "./videoRoutes";
import createComentarioRouter from "./comentarioRoutes";
import createVotoRouter from "./votoRoutes";
import createTurmaRouter from "./turmaRoutes";
import createMateriaRouter from "./materiaRoutes";
import createAutenticacaoRouter from "./autenticacaoRoutes";
import createFavoritoRouter from "./favoritoRoutes";
import createUploadRouter from "./uploadRoutes";
import createDownloadRouter from "./downloadRoutes";
import createHistoricoRouter from "./historicoRoutes";
import createProfessorRouter from "./professorTurmaRoutes";
import enviaEmailRouter from "./enviaEmailRoutes";
import createUsuarioRouter from "./usuarioRoutes";

const createRouters = (app: express.Express) => {
  app.use("/videos", createVideoRouter());
  app.use("/comentarios", createComentarioRouter());
  app.use("/votos", createVotoRouter());
  app.use("/turma", createTurmaRouter());
  app.use("/usuario", createUsuarioRouter());
  app.use("/materias", createMateriaRouter());
  app.use("/autenticacao", createAutenticacaoRouter());
  app.use("/favoritos", createFavoritoRouter());
  app.use("/upload", createUploadRouter());
  app.use("/download", createDownloadRouter());
  app.use("/historicos", createHistoricoRouter());
  app.use("/professor", createProfessorRouter());
  app.use("/email", enviaEmailRouter());
};

export default createRouters;
