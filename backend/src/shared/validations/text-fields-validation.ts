import { IValidation } from "@shared/protocols/validation";
import { InvalidTypeError } from "@shared/errors/invalid-type-error";
import { isEmpty } from "@shared/utils/isEmpty";
import { getDeepValue } from "@shared/utils/getDeepValue";

export class TextFieldsValidation implements IValidation {
  constructor(private readonly fieldnames: string[] = []) {}

  validate(input: unknown): Error | null {
    if (typeof input !== "object") return null;

    for (const field of this.fieldnames) {
      const value = getDeepValue(input, field);

      if (!isEmpty(value) && typeof value !== "string") {
        return new InvalidTypeError(field, "string");
      }
    }

    return null;
  }
}
