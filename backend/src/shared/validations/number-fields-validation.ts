import { IValidation } from "@shared/protocols/validation";
import { InvalidTypeError } from "@shared/errors";
import { isEmpty } from "@shared/utils/isEmpty";
import { getDeepValue } from "@shared/utils/getDeepValue";

export class NumberFieldsValidation implements IValidation {
  constructor(private readonly fieldnames: string[] = []) {}

  validate(input: unknown): Error | null {
    if (typeof input !== "object") return null;

    for (const field of this.fieldnames) {
      const value = getDeepValue(input, field);

      if (!isEmpty(value) && typeof value !== "number") {
        return new InvalidTypeError(field, "number");
      }
    }

    return null;
  }
}
