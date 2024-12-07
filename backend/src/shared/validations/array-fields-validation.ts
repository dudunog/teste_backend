import { MissingParamError } from "@shared/errors";

export const ArrayValidation = (input: unknown, nameField: string) => {
  if (!Array.isArray(input)) {
    return new MissingParamError(nameField);
  }

  return null;
};
