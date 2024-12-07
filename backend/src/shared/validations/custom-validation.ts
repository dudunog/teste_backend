import { IValidation } from "@shared/protocols/validation";

export class CustomValidations implements IValidation {
  constructor(
    private readonly validations: ((input: unknown) => Error | null)[] = []
  ) {}

  validate(input: unknown): Error | null {
    for (const validation of this.validations) {
      const error = validation(input);

      if (error) return error;
    }

    return null;
  }
}
