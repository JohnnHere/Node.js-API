import { FieldValidationError } from "../../@types/utils/FieldValidationError";

export interface BaseError extends Error {
  name: string;
  fieldsErrors?: FieldValidationError[];
  httpStatus: number;
}
