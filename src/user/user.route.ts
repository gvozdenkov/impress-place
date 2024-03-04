import { Router } from 'express';
import { schemaValidator } from '#middlewares';
import { userController } from './user.controller';
import { updateAvatar, updateUser } from './validation-schemas';

var userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.get('/me', userController.getMe);
userRouter.get('/:userId', userController.getById);
userRouter.patch('/me/avatar', schemaValidator(updateAvatar), userController.updateMeAvatar);
userRouter.patch('/me', schemaValidator(updateUser), userController.updateMe);

export { userRouter };
