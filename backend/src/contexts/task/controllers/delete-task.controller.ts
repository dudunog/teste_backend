import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IDeleteTaskUseCase } from "@contexts/task/usecases/_ports/delete-task-usecase.struct";

export class DeleteTaskController implements Controller {
  constructor(private readonly deleteTaskUseCase: IDeleteTaskUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params ?? {};

      const result = await this.deleteTaskUseCase.execute({
        id,
      });

      if (result.isFailure) {
        return badRequest(result.error);
      }

      return ok(result.getValue());
    } catch (error) {
      return serverError(error);
    }
  }
}
