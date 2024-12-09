import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { IUpdateTaskUseCase } from "@contexts/task/usecases/_ports/update-task-usecase.struct";

export class UpdateTaskController implements Controller {
  constructor(
    private readonly updateTaskUseCase: IUpdateTaskUseCase,
    private readonly validation: IValidation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const { id } = request.params ?? {};
      const { title, description, completed } = request.body;

      const result = await this.updateTaskUseCase.execute({
        id,
        title,
        description,
        completed,
      });

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
