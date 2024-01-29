/* eslint-disable no-underscore-dangle */
import { Request, Router } from 'express';
import { cardService } from './card.service';
import { ModifiedResponse } from '../types';

var cardRouter = Router();

cardRouter.post('/', (req: Request, res: ModifiedResponse) => {
  var { name, link } = req.body;
  var owner = req.user._id;
  res.promise(cardService.create({ name, link, owner }));
});

cardRouter.put('/:cardId/likes', (req: Request, res: ModifiedResponse) => {
  var userId = req.user._id;
  res.promise(cardService.setLike(req.params.cardId, userId));
});

cardRouter.delete('/:cardId/likes', (req: Request, res: ModifiedResponse) => {
  var userId = req.user._id;
  res.promise(cardService.removeLike(req.params.cardId, userId));
});

cardRouter.delete('/:cardId', (req, res: ModifiedResponse) =>
  res.promise(cardService.deleteById(req.params.cardId)),
);

cardRouter.get('/', (req, res: ModifiedResponse) => res.promise(cardService.getAll()));

cardRouter.get('/:id', (req, res: ModifiedResponse) =>
  res.promise(cardService.getById(req.params.id)),
);

export { cardRouter };
