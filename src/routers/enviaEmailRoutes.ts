import { Router } from "express";
import { middlewareAutenticacao } from "../middlewares/autenticacao";
import Container from "typedi";
import { EnviaEmailComCodigoController } from "../controllers/EmailControllers/EnviaEmailComCodigoController";
import { EnviaEmailRecuperacaoSenhaController } from "../controllers/EmailControllers/EnviaEmailRecuperacaoSenhaController";
import { middlewareAutorizacaoProfessorEAdmin } from "../middlewares/autorizacaoProfessorEAdmin";
import { errorHandlerWrapper } from "../middlewares/errorHandlers";

const router = Router();

const enviaEmailController = (): EnviaEmailComCodigoController => {
  return Container.get<EnviaEmailComCodigoController>(
    "EnviaEmailComCodigoController"
  );
};

const enviaEmailSenhaController = (): EnviaEmailRecuperacaoSenhaController => {
  return Container.get<EnviaEmailRecuperacaoSenhaController>(
    "EnviaEmailRecuperacaoSenhaController"
  );
};

const createRouter = () => {
  router.post("/cadastro",
    middlewareAutenticacao,
    middlewareAutorizacaoProfessorEAdmin,
    errorHandlerWrapper((req, res) => enviaEmailController().sendMail(req, res))
  );
  router.post("/redefinir",
    errorHandlerWrapper((req, res) => enviaEmailSenhaController().sendMail(req, res))
  );

  return router;
};

export default createRouter;
