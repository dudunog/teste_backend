import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeCreateListValidationFactory = (): IValidation => {
  return new Validator({
    required: ["title", "slug"],
    string: ["title", "slug"],
  });
};
