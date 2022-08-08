import * as express from "express";
import { BaseError } from "../@types/errors/BaseError";
import { BadRequestError } from "../@types/errors/BadRequestError";
import { ForbiddenError } from "../@types/errors/ForbiddenError";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";
import { UnprocessableEntityError } from "../@types/errors/UnprocessableEntityError";
import { EmailJaCadastrado } from "../@types/errors/EmailJaCadastrado";
import { UsuarioOuSenhaInvalidos } from "../@types/errors/UsuarioOuSenhaInvalidos";
import { SenhaInvalida } from "../@types/errors/SenhaInvalida";
import { ClassValidationError } from "../@types/errors/ClassValidationError";

const handledHttpStatusErrors = [
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError,
  UsuarioOuSenhaInvalidos,
  EmailJaCadastrado,
  SenhaInvalida,
  ClassValidationError,
];

const isErrorHandled = (error: BaseError) => {
  return handledHttpStatusErrors.some(
    (errorClass) => error instanceof errorClass
  );
};

export const errorHandlers = (app: express.Express) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(
    (
      error: BaseError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (isErrorHandled(error)) {
        return res.status(error.httpStatus).json({
          name: error.name,
          message: error.message,
          httpStatus: error.httpStatus,
          fieldsErrors: error.fieldsErrors ?? [],
        });
      }
      res.status(500).json({ error: error.message });
    }
  );
};

export const errorHandlerWrapper =
  (handler: express.RequestHandler) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      Promise.resolve(handler(req, res, next)).catch(next);
    } catch (error) {
      next(error);
    }
  };
