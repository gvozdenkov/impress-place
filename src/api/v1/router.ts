import { Router } from 'express';
import { docRouter } from './docs';

var router = Router();

router.use('/docs', docRouter);
router.get('/', (req, res) => {
  res.send('Home Route');
});

export { router };
