import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeCreateTaskValidationFactory = (): IValidation => {
  return new Validator({
    required: ["title"],
    string: ["title"],
  });
};
