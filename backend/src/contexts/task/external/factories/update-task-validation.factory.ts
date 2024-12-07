import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeUpdateTaskValidationFactory = (): IValidation => {
  return new Validator({
    required: [],
    string: [],
  });
};
