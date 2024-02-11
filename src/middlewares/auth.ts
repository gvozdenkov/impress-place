import { NextFunction, Request, Response } from 'express';

export var auth = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    // temporal auth id for test user
    _id: '65c0ed71f32fdf3c94c10381',
  };

  next();
};
