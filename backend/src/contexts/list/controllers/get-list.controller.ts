import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IGetListUseCase } from "../usecases/_ports/get-list-usecase.struct";

export class GetListController implements Controller {
  constructor(private getListUseCase: IGetListUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params ?? {};

      const result = await this.getListUseCase.execute({
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
