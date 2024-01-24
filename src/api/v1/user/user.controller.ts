import { NextFunction, Request, Response } from 'express';
import { User, UserSchema } from './user.model';
import { TypedRequestBody } from '../types';
import { responseBuilder } from '../middlewares';

var createUser = async (req: TypedRequestBody<UserSchema>, res: Response, next: NextFunction) => {
  var { name, about, avatar } = req.body;

  try {
    var user = new User({ name, about, avatar });
    var savedUser = await user.save();
    res.status(200).json(responseBuilder('success', savedUser));
  } catch (e) {
    next(e);
  }
};

var getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var result = await User.find({});
    res.send(result);
  } catch (e) {
    next();
  }
};

var getUserById = (req: Request, res: Response, next: NextFunction) => {
  var id = req.params.userId;

  User.findById(id)
    .then((user) => res.status(200).json(responseBuilder('success', user)))
    .catch(next);
};

export var UserController = {
  createUser,
  getAllUsers,
  getUserById,
};
