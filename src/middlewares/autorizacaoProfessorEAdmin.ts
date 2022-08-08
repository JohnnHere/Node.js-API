import { RequestUsuario } from "../@types/middlewares/requestUsuario";
import { NextFunction, Response } from "express";
import { ForbiddenError } from "../@types/errors/ForbiddenError";

export const middlewareAutorizacaoProfessorEAdmin = (
  req: RequestUsuario,
  res: Response,
  next: NextFunction
) => {
  const { usuario } = req;
  if (!usuario.tipoUsuario) {
    throw new ForbiddenError();
  }
  if (usuario.tipoUsuario !== "professor" && usuario.tipoUsuario !== "admin") {
    throw new ForbiddenError();
  }

  next();
};
