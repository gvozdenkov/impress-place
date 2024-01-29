/* eslint-disable no-underscore-dangle */
import { Router } from 'express';
import { userService } from './user.service';
import { ModifiedResponse } from '../types';

var userRouter = Router();

userRouter.post('/', (req, res: ModifiedResponse) => res.promise(userService.create(req.body)));
userRouter.get('/', (req, res: ModifiedResponse) => res.promise(userService.getAll()));
userRouter.get('/:userId', (req, res: ModifiedResponse) =>
  res.promise(userService.getById(req.params.userId)),
);

userRouter.patch('/me', (req, res: ModifiedResponse) => {
  var id = req.user._id;
  res.promise(userService.updateMe(id, req.body));
});

userRouter.patch('/me/avatar', (req, res: ModifiedResponse) => {
  var id = req.user._id;
  res.promise(userService.updateMeAvatar(id, req.body));
});

export { userRouter };
