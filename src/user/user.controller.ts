/* eslint-disable no-underscore-dangle */
import { Request } from 'express';
import { ModifiedResponse } from '#types';
import { userService } from './user.service';

var create = (req: Request, res: ModifiedResponse) => res.promise(userService.create(req.body));

var getAll = (req: Request, res: ModifiedResponse) => res.promise(userService.getAll());

var getById = (req: Request, res: ModifiedResponse) =>
  res.promise(userService.getById(req.params.userId));

var updateMe = (req: Request, res: ModifiedResponse) =>
  res.promise(userService.updateMe(req.user._id, req.body));

var updateMeAvatar = (req: Request, res: ModifiedResponse) =>
  res.promise(userService.updateMeAvatar(req.user._id, req.body));

export var userController = {
  create,
  getAll,
  getById,
  updateMe,
  updateMeAvatar,
};
