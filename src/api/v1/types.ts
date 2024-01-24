import { Request } from 'express';

export type ResStatus = 'success' | 'fail' | 'error';

export interface TypedRequestBody<T> extends Request {
  body: T;
}
