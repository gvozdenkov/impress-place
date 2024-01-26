import { Router } from 'express';
import { userService } from './user.service';
import { ModifiedResponse } from '../types';

var userRouter = Router();

userRouter.post('/', (req, res: ModifiedResponse) => res.promise(userService.create(req.body)));
userRouter.get('/', (req, res: ModifiedResponse) => res.promise(userService.getAll()));
userRouter.get('/:userId', (req, res: ModifiedResponse) =>
  res.promise(userService.getById(req.params.userId)),
);

export { userRouter };
