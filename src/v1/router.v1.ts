import { Router } from 'express';
import { docRouter } from '#docs';
import { cardRouter } from '#card';
import { userRouter } from '#user';
import { authRouter } from '#auth';

var routerV1 = Router();

routerV1.use('/docs', docRouter);
routerV1.get('/', (req, res) => {
  res.json({ message: 'It works!' });
});
routerV1.use('/cards', cardRouter);
routerV1.use('/users', userRouter);
routerV1.use('/auth', authRouter);

export { routerV1 };
