import { Router } from 'express';
import { authController } from './auth.controller';

var authRouter = Router();

authRouter.post('/signup', authController.register);
authRouter.post('/signin', authController.login);

export { authRouter };
