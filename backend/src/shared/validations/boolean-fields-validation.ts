import { IValidation } from "@shared/protocols/validation";
import { InvalidTypeError } from "@shared/errors";
import { getDeepValue } from "@shared/utils/getDeepValue";

export class BooleanFieldsValidation implements IValidation {
  constructor(private readonly fieldnames: string[] = []) {}

  validate(input: unknown): Error | null {
    if (typeof input !== "object") return null;

    for (const field of this.fieldnames) {
      const value = getDeepValue(input, field);

      if (typeof value !== "boolean") {
        return new InvalidTypeError(field, "boolean");
      }
    }

    return null;
  }
}
