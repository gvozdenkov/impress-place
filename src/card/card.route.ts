import { Router } from 'express';
import { auth } from '#middlewares';
import { cardController } from './card.controller';

var cardRouter = Router();

cardRouter.get('/', cardController.getAll);
cardRouter.get('/:id', cardController.getById);

cardRouter.use(auth);

cardRouter.post('/', cardController.create);
cardRouter.put('/:cardId/likes', cardController.handleLike);
cardRouter.delete('/:cardId/likes', cardController.handleLike);
cardRouter.delete('/:cardId', cardController.deleteById);

export { cardRouter };
