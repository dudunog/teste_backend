export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest {
  params?: any;
  query?: any;
  body?: any;
  headers?: any;
  account?: any;
  userId?: string;
}

export interface HttpNextFunction {
  (error?: Error): void;
}
