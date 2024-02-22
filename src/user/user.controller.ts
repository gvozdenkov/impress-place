/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, formatResponseData } from '#utils';
import { userService } from '#services';

var getAll = catchAsync(async (req: Request, res: Response) => {
  var users = await userService.getAll();

  res.status(httpStatus.OK).send(formatResponseData(users));
});

var getById = catchAsync(async (req: Request, res: Response) => {
  var user = await userService.getById(req.params.userId);

  res.status(httpStatus.OK).send(formatResponseData(user));
});

var updateMe = catchAsync(async (req: Request, res: Response) => {
  var updatedUser = await userService.updateMe(req.user._id, req.body);

  res.status(httpStatus.OK).send(formatResponseData(updatedUser));
});

var updateMeAvatar = catchAsync(async (req: Request, res: Response) => {
  var updatedAvatar = await userService.updateMeAvatar(req.user._id, req.body);

  res.status(httpStatus.OK).send(formatResponseData(updatedAvatar));
});

export var userController = {
  getAll,
  getById,
  updateMe,
  updateMeAvatar,
};
