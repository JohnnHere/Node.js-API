import { BaseError } from "./BaseError";

/***
 * Classe que implementa a abstração dos erros de entidade não encontrada. Esta deverá ser respondida
 * como um código HTTP 401.
 */
export class ForbiddenError extends Error implements BaseError {
  public name: string;
  public httpStatus: number;

  constructor(message = "") {
    super(message);
    this.name = "ForbiddenError";
    this.httpStatus = 403;
  }
}
