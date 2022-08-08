import { ClassValidationError } from "../../@types/errors/ClassValidationError";
import { validate, ValidationError } from "class-validator";
import { Service } from "typedi";
import { FieldValidationError } from "../../@types/utils/FieldValidationError";

@Service("ValidationService")
export class ValidationService {
  private generateError(
    errors: ValidationError[],
    property?: string
  ): FieldValidationError[] {
    let errorsMessages: FieldValidationError[] = [];

    errors.forEach((error) => {
      const prefix = property
        ? `${property}.${error.property}`
        : error.property;

      if (error.children.length > 0) {
        const childrenErrors = this.generateError(error.children, prefix);
        errorsMessages = errorsMessages.concat(childrenErrors);
      } else {
        Object.keys(error.constraints).forEach((key) => {
          errorsMessages.push({
            field: prefix,
            message: error.constraints[key],
          });
        });
      }
    });

    return errorsMessages;
  }

  async validate(model: object, property?: string): Promise<void> {
    const errors = await validate(model);

    if (errors.length) {
      throw new ClassValidationError(
        "Erro de validação",
        this.generateError(errors, property)
      );
    }
  }
}
