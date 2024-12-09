import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { IListListsUseCase } from "../usecases/_ports/list-lists-usecase.struct";

export class ListListsController implements Controller {
  constructor(
    private readonly listListsUseCase: IListListsUseCase,
    private readonly validation: IValidation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);

      if (error) {
        return badRequest(error);
      }

      const result = await this.listListsUseCase.execute({});

      if (result.isFailure) {
        return badRequest(result.error);
      }

      return ok(result.getValue());
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
