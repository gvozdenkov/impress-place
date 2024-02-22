import { Router } from 'express';
import { cardController } from './card.controller';

var cardRouter = Router();

cardRouter.post('/', cardController.create);

cardRouter.get('/', cardController.getAll);
cardRouter.get('/:id', cardController.getById);

cardRouter.put('/:cardId/likes', cardController.handleLike);
cardRouter.delete('/:cardId/likes', cardController.handleLike);

cardRouter.delete('/:cardId', cardController.deleteById);

export { cardRouter };
