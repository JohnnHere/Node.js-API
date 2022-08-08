import { FieldValidationError } from "../../@types/utils/FieldValidationError";
import { BadRequestError } from "./BadRequestError";

export class ClassValidationError extends BadRequestError {
  fieldsErrors: FieldValidationError[];

  constructor(message = "", errors: FieldValidationError[]) {
    super(message);
    this.fieldsErrors = errors;
  }
}
