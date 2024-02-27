import { Router } from 'express';
import { auth } from '#middlewares';
import { userController } from './user.controller';

var userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.get('/me', auth, userController.getMe);
userRouter.get('/:userId', userController.getById);
userRouter.patch('/me/avatar', userController.updateMeAvatar);
userRouter.patch('/me', userController.updateMe);

export { userRouter };
