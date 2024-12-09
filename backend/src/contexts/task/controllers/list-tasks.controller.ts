import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { IListTasksUseCase } from "@contexts/task/usecases/_ports/list-tasks-usecase.struct";
import { GetListBySlugUseCase } from "@contexts/list/usecases/get-list-by-slug.usecase";

export class ListTasksController implements Controller {
  constructor(
    private readonly listTasksUseCase: IListTasksUseCase,
    private readonly getListUseCase: GetListBySlugUseCase,
    private readonly validation: IValidation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);

      if (error) {
        return badRequest(error);
      }

      const { slug } = request.query;

      const listResult = await this.getListUseCase.execute({
        slug,
      });

      if (listResult.isFailure) {
        return badRequest(listResult.error);
      }

      const result = await this.listTasksUseCase.execute({
        ...(slug && {
          listId: listResult.getValue().id,
        }),
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
