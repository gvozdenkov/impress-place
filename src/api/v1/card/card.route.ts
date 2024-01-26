import { Request, Router } from 'express';
import { cardService } from './card.service';
import { ModifiedResponse } from '../types';

var cardRouter = Router();

cardRouter.post('/', (req: Request, res: ModifiedResponse) => {
  // console.log(req.user);
  var { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  var owner = req.user._id;
  res.promise(cardService.create({ name, link, owner }));
});
cardRouter.get('/', (req, res: ModifiedResponse) => res.promise(cardService.getAll()));

export { cardRouter };
