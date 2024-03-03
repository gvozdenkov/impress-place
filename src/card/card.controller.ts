/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError, catchAsync, formatResponseData } from '#utils';
import { message } from '#messages';
import { cardService } from './card.service';

var create = catchAsync(async (req: Request, res: Response) => {
  var { body, userId: owner } = req;
  var { name, link } = body;
  var newCard = await cardService.create({ name, link, owner });

  res.status(httpStatus.OK).json(formatResponseData(newCard));
});

var getAll = catchAsync(async (req: Request, res: Response) => {
  var cards = await cardService.getAll();

  res.status(httpStatus.OK).json(formatResponseData(cards));
});

var getById = catchAsync(async (req: Request, res: Response) => {
  var card = await cardService.getById(req.params.carcId);

  res.status(httpStatus.OK).json(formatResponseData(card));
});

var handleLike = catchAsync(async (req: Request, res: Response) => {
  var { params, userId } = req;
  var { cardId } = params;

  var updatedCard =
    req.method === 'PUT'
      ? await cardService.setLike(cardId, userId)
      : await cardService.removeLike(cardId, userId);

  res.status(httpStatus.OK).json(formatResponseData(updatedCard));
});

var deleteById = catchAsync(async (req: Request, res: Response) => {
  var { params, userId } = req;
  var { cardId } = params;

  var { owner } = await cardService.getById(cardId);

  if (userId !== owner.toString())
    throw new ApiError(httpStatus.FORBIDDEN, message.forbiddenCardDelete());

  var deletedCard = await cardService.deleteById(req.params.cardId);

  res.status(httpStatus.OK).json(formatResponseData(deletedCard));
});

export var cardController = {
  create,
  getAll,
  getById,
  handleLike,
  deleteById,
};
