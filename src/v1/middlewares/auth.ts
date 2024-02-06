import { NextFunction, Request, Response } from 'express';

export var auth = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    // temporal auth id for test user
    _id: process.env.TEMP_USER_ID!,
  };

  next();
};
