/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, formatResponseData } from '#utils';
import { userService } from './user.service';

var getAll = catchAsync(async (req: Request, res: Response) => {
  var users = await userService.getAll();

  res.status(httpStatus.OK).json(formatResponseData(users));
});

var getById = catchAsync(async (req: Request, res: Response) => {
  var user = await userService.getById(req.params.userId);

  res.status(httpStatus.OK).json(formatResponseData(user));
});

var getMe = catchAsync(async (req: Request, res: Response) => {
  var user = await userService.getById(req.userId);
  res.status(httpStatus.OK).json(formatResponseData(user));
});

var updateMe = catchAsync(async (req: Request, res: Response) => {
  var updatedUser = await userService.updateMe(req.userId, req.body);

  res.status(httpStatus.OK).json(formatResponseData(updatedUser));
});

var updateMeAvatar = catchAsync(async (req: Request, res: Response) => {
  var updatedAvatar = await userService.updateMeAvatar(req.userId, req.body);

  res.status(httpStatus.OK).json(formatResponseData(updatedAvatar));
});

export var userController = {
  getAll,
  getById,
  getMe,
  updateMe,
  updateMeAvatar,
};
