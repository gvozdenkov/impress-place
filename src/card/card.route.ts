import { Router } from 'express';
import { auth, schemaValidator } from '#middlewares';
import { cardController } from './card.controller';
import { createCard } from './validation-schemas';

var cardRouter = Router();

cardRouter.get('/', cardController.getAll);
cardRouter.get('/:id', cardController.getById);

cardRouter.use(auth);

cardRouter.post('/', schemaValidator(createCard), cardController.create);
cardRouter.put('/:cardId/likes', cardController.handleLike);
cardRouter.delete('/:cardId/likes', cardController.handleLike);
cardRouter.delete('/:cardId', cardController.deleteById);

export { cardRouter };
