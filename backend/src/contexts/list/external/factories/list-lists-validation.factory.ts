import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeListListsValidationFactory = (): IValidation => {
  return new Validator();
};
