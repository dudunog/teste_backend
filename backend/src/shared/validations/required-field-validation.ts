import { MissingParamError } from "@shared/errors";
import { IValidation } from "@shared/protocols/validation";
import { getDeepValue } from "@shared/utils/getDeepValue";
import { isEmpty } from "@shared/utils/isEmpty";

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldnames: string[] = []) {}

  validate(input: unknown): Error | null {
    if (typeof input !== "object") return null;

    for (const field of this.fieldnames) {
      const value = getDeepValue(input, field);

      if (isEmpty(value)) {
        return new MissingParamError(field);
      }
    }

    return null;
  }
}
