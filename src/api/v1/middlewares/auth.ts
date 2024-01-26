import { NextFunction, Request, Response } from 'express';

export var auth = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    // temporal auth id for test user
    _id: '65b350330139fc3caa9a320e',
  };

  next();
};
