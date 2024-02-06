import { Request, Response } from 'express';

export type ResStatus = 'success' | 'fail' | 'error';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface ErrorWithCode extends Error {
  code: number;
}

export interface ModifiedResponse extends Response {
  [key: string]: any;
}

export type Data = {
  status: ResStatus;
  data: any;
};

export type Error = {
  status: ResStatus;
  message: string;
};

export type ServiceReturn = {
  statusCode?: number;
  data: any;
};

export type ServiceReturnPromise = Promise<ServiceReturn>;
