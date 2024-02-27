import { Router } from 'express';
import { docRouter } from '#docs';
import { cardRouter } from '#card';
import { userRouter } from '#user';
import { authRouter } from '#auth';
import { config } from '#config';

var routerV1 = Router();
var basePathV1 = `${config.basePath}/v1`;

routerV1.use('/docs', docRouter);
routerV1.get('/', (req, res) => {
  res.json({ message: 'It works!' });
});
routerV1.use('/cards', cardRouter);
routerV1.use('/users', userRouter);
routerV1.use('/', authRouter);

export { routerV1, basePathV1 };
