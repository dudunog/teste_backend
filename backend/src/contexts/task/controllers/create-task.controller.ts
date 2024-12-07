import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { ICreateTaskUseCase } from "@contexts/task/usecases/_ports/create-task-usecase.struct";

export class CreateTaskController implements Controller {
  constructor(
    private readonly createTaskUseCase: ICreateTaskUseCase,
    private readonly validation: IValidation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const { title, description } = request.body;

      const result = await this.createTaskUseCase.execute({
        title,
        description,
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
