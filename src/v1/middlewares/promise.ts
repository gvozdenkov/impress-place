import { Request, NextFunction } from 'express';
import { ErrorWithCode, ModifiedResponse, ServiceReturn } from '../types';
import { handleResponse } from './handle-response';
import { handleResponseError } from './handle-response-error';

export var promiseMiddleware = () => (req: Request, res: ModifiedResponse, next: NextFunction) => {
  res.promise = (p: any) => {
    var promiseToResolve;
    if (p.then && p.catch) {
      promiseToResolve = p;
    } else if (p.constructor === Function) {
      promiseToResolve = Promise.resolve().then(() => p());
    } else {
      promiseToResolve = Promise.resolve(p);
    }

    return promiseToResolve
      .then(({ data, statusCode }: ServiceReturn) => {
        handleResponse(res, data, statusCode);
      })
      .catch((e: ErrorWithCode) => handleResponseError(res, e.message, e.code));
  };

  return next();
};
