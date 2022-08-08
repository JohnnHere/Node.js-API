import { BaseError } from "./BaseError";

/***
 * Classe que implementa a abstração dos erros de entidade não encontrada. Esta deverá ser respondida
 * como um código HTTP 404.
 */
export class NotFoundError extends Error implements BaseError {
  public name: string;
  public httpStatus: number;

  constructor(message = "") {
    super(message);
    this.name = "NotFoundError";
    this.httpStatus = 404;
  }
}
