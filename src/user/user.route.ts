import { Router } from 'express';
import { userController } from './user.controller';

var userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getById);
userRouter.patch('/me', userController.updateMe);
userRouter.patch('/me/avatar', userController.updateMeAvatar);

export { userRouter };
