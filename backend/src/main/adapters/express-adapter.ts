import { Request, Response } from "express";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";

interface Middleware {
  (request: HttpRequest): Promise<HttpResponse>;
}

export const adaptResponse = (
  response: Response,
  httpResponse: HttpResponse,
  fakeHttpStatus?: boolean
): Response => {
  if (fakeHttpStatus) {
    return response.status(200).json(httpResponse?.body);
  }
  if (httpResponse.statusCode === 200) {
    return response.status(httpResponse.statusCode).json(httpResponse.body);
  }
  return response.status(httpResponse.statusCode).json({
    error: httpResponse.body?.message,
    type: httpResponse.body?.name,
  });
};

export const adaptRoute = (
  controller: Controller,
  middlewares?: Middleware[],
  fakeHttpStatus?: boolean
) => {
  return async (request: Request, response: Response) => {
    if (fakeHttpStatus) {
      request.statusCode = 200;
    }

    const httpRequest: HttpRequest = {
      params: request.params,
      query: request.query,
      body: request.body,
      headers: request.headers,
    };

    let errorOfMiddleware = false;
    let responseMiddleware: HttpResponse;
    if (middlewares) {
      for (const middleware of middlewares) {
        responseMiddleware = await middleware(request);

        if (responseMiddleware) {
          errorOfMiddleware = true;
          break;
        }
      }
    }

    if (errorOfMiddleware) {
      return adaptResponse(response, responseMiddleware);
    }
    const httpResponse = await controller.handle(httpRequest);
    return adaptResponse(response, httpResponse, fakeHttpStatus);
  };
};
