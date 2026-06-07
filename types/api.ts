export interface ApiSuccess<TData> {
  ok: true;
  data: TData;
}

export interface ApiFailure {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: string[];
  };
}

export type ApiResult<TData> = ApiSuccess<TData> | ApiFailure;

export interface ReportCreatedResponse {
  reportId: string;
  message: string;
}
