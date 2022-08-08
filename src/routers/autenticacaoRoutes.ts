import { Router } from "express";
import Container from "typedi";
import { LoginController } from "../../src/controllers/AutenticacaoControllers/LoginController";
import { CadastrarAlunoController } from "../../src/controllers/AutenticacaoControllers/CadastrarAlunoController";
import { CadastrarProfessorController } from "../controllers/AutenticacaoControllers/CadastrarProfessorController";
import { CadastrarAdminController } from "../controllers/AutenticacaoControllers/CadastrarAdminController";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";
import { middlewareAutorizacaoAdmin } from "../middlewares/autorizacaoAdmin";
import { middlewareAutenticacao } from "../middlewares/autenticacao";

const router = Router();

const loginController = (): LoginController => {
  return Container.get<LoginController>("LoginController");
};

const cadastrarAlunoController = (): CadastrarAlunoController => {
  return Container.get<CadastrarAlunoController>("CadastrarAlunoController");
};

const cadastrarProfessorController = (): CadastrarProfessorController => {
  return Container.get<CadastrarProfessorController>(
    "CadastrarProfessorController"
  );
};

const cadastrarAdminController = (): CadastrarAdminController => {
  return Container.get<CadastrarAdminController>("CadastrarAdminController");
};

const crateRouter = () => {
  router.post(
    "/signup/aluno",
    errorHandlerWrapper((req, res) =>
      cadastrarAlunoController().cadastrar(req, res)
    )
  );

  router.post(
    "/login",
    errorHandlerWrapper((req, res) => loginController().autenticar(req, res))
  );
  // rotas que precisam de autenticação
  router.use(middlewareAutenticacao);
  router.post(
    "/signup/professor",
    middlewareAutorizacaoAdmin,
    errorHandlerWrapper((req, res) =>
      cadastrarProfessorController().cadastrar(req, res)
    )
  );
  router.post(
    "/signup/admin",
    middlewareAutorizacaoAdmin,
    errorHandlerWrapper((req, res) =>
      cadastrarAdminController().cadastrar(req, res)
    )
  );

  return router;
};

export default crateRouter;
