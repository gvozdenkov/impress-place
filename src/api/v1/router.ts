import { Router } from 'express';
import { docRouter } from './docs';
import { userRouter } from './user';

var router = Router();
export var BASE_PATH = '/api/v1';

router.use('/docs', docRouter);
router.get('/', (req, res) => {
  res.json({ message: 'It works!' });
});
router.use('/users', userRouter);

export { router };
