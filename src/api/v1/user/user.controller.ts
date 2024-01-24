import { NextFunction, Request, Response } from 'express';
import { UserSchema } from './user.model';
import { TypedRequestBody } from '../types';
import { responseBuilder } from '../middlewares';
import { userService } from './user.service';

var createUser = async (req: TypedRequestBody<UserSchema>, res: Response, next: NextFunction) => {
  var { name, about, avatar } = req.body;

  userService
    .create({ name, about, avatar })
    .then((user) => res.status(200).json(responseBuilder('success', user)))
    .catch(next);
};

var getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  userService
    .getAll()
    .then((users) => res.status(200).json(responseBuilder('success', users)))
    .catch(next);
};

var getUserById = (req: Request, res: Response, next: NextFunction) => {
  userService
    .getById(req.params.userId)
    .then((user) => res.status(200).json(responseBuilder('success', user)))
    .catch(next);
};

export var UserController = {
  createUser,
  getAllUsers,
  getUserById,
};
