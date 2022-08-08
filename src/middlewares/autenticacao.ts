import { RequestUsuario } from "../@types/middlewares/requestUsuario";
import { NextFunction, Response } from "express";
import { verificarToken } from "../helpers/Token";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";

export const middlewareAutenticacao = (
  request: RequestUsuario,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;
  if (!authorization) {
    throw new UnauthorizedError();
  }

  try {
    const usuario = verificarToken(authorization);
    request.usuario = usuario;
  } catch (error) {
    throw new UnauthorizedError();
  }

  next();
};
