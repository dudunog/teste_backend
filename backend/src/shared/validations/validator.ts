import { IValidation, IValidatorScheme } from "@shared/protocols/validation";
import { CustomValidations } from "./custom-validation";
import {
  BooleanFieldsValidation,
  NumberFieldsValidation,
  RequiredFieldValidation,
  TextFieldsValidation,
} from "./index";

export class Validator implements IValidation {
  constructor(private readonly validations: IValidatorScheme = {}) {}

  validate(input: any): Error | null {
    const validationsScheme: Record<keyof IValidatorScheme, IValidation> = {
      required: new RequiredFieldValidation(this.validations.required),
      boolean: new BooleanFieldsValidation(this.validations.boolean),
      number: new NumberFieldsValidation(this.validations.number),
      string: new TextFieldsValidation(this.validations.string),
      custom: new CustomValidations(this.validations.custom),
    };

    for (const validationKey in validationsScheme) {
      const validation =
        validationsScheme[validationKey as keyof IValidatorScheme];

      const error = validation.validate(input);

      if (error) {
        return error;
      }
    }

    return null;
  }
}
