import { Router } from 'express';
import { schemaValidator } from '#middlewares';
import { createUser, loginUser } from '#user/validation-schemas';
import { authController } from './auth.controller';

var authRouter = Router();

authRouter.post('/signup', schemaValidator(createUser), authController.register);
authRouter.post('/signin', schemaValidator(loginUser), authController.login);

export { authRouter };
