import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IGetListUseCase } from "../usecases/_ports/get-list-usecase.struct";

export class GetListController implements Controller {
  constructor(private getListUseCase: IGetListUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params ?? {};

      const userResult = await this.getListUseCase.execute({
        id,
      });

      if (userResult.isFailure) {
        return badRequest(userResult.error);
      }

      return ok(userResult.getValue());
    } catch (error) {
      return serverError(error);
    }
  }
}
