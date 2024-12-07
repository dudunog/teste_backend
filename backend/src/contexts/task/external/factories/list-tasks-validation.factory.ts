import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeListTasksValidationFactory = (): IValidation => {
  return new Validator();
};
