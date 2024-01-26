import { Response } from 'express';

export var handleResponseError = (res: Response, message: any, status?: number) =>
  res.status(status || 500).send({
    status: status === 500 ? 'error' : 'fail',
    message,
  });
