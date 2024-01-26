import { NextFunction, Request, Response } from 'express';
import { handleResponseError } from './handle-response-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var errorHandler = (err: Error, res: Response, req: Request, next: NextFunction) => {
  handleResponseError(res, err.message);
};
