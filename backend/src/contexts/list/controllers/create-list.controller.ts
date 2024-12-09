import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { ICreateListUseCase } from "../usecases/_ports/create-list-usecase.struct";

export class CreateListController implements Controller {
  constructor(
    private readonly createListUseCase: ICreateListUseCase,
    private readonly validation: IValidation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const { title, slug } = request.body;

      const result = await this.createListUseCase.execute({
        title,
        slug,
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
