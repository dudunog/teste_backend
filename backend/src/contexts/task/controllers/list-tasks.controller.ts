import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { IListTasksUseCase } from "@contexts/task/usecases/_ports/list-tasks-usecase.struct";

export class ListTasksController implements Controller {
  constructor(
    private readonly listTasksUseCase: IListTasksUseCase,
    private readonly validation: IValidation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);

      if (error) {
        return badRequest(error);
      }

      const result = await this.listTasksUseCase.execute({});

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
