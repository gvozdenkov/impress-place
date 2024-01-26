import { Response } from 'express';

export var handleResponse = (res: Response, data: any, status?: number) =>
  res.status(status || 200).send({
    status: 'success',
    data,
  });
