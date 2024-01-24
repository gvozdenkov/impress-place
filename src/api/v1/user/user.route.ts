import { Router } from 'express';
import { UserController } from './user.controller';

var userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUserById);

export { userRouter };
