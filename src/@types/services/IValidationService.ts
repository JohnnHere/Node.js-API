export interface IValidationService {
  validate(model: object, property?: string): Promise<void>;
}
