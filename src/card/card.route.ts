import { Router } from 'express';
import { auth, paramsValidator, schemaValidator } from '#middlewares';
import { cardController } from './card.controller';
import { createCard, cardIdParam } from './validation-schemas';

var cardRouter = Router();

cardRouter.get('/', cardController.getAll);
cardRouter.get('/:cardId', paramsValidator(cardIdParam), cardController.getById);

cardRouter.use(auth);

cardRouter.post('/', schemaValidator(createCard), cardController.create);
cardRouter.put('/:cardId/likes', paramsValidator(cardIdParam), cardController.handleLike);
cardRouter.delete('/:cardId/likes', paramsValidator(cardIdParam), cardController.handleLike);
cardRouter.delete('/:cardId', paramsValidator(cardIdParam), cardController.deleteById);

export { cardRouter };
