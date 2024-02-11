/* eslint-disable no-underscore-dangle */
import { Request } from 'express';
import { ModifiedResponse } from '#types';
import { cardService } from './card.service';

var create = (req: Request, res: ModifiedResponse) => {
  var { body, user } = req;
  var { name, link } = body;
  var owner = user._id;
  res.promise(cardService.create({ name, link, owner }));
};

var getAll = (req: Request, res: ModifiedResponse) => res.promise(cardService.getAll());

var getById = (req: Request, res: ModifiedResponse) =>
  res.promise(cardService.getById(req.params.carcId));

var setLike = (req: Request, res: ModifiedResponse) => {
  var { params, user } = req;
  var userId = user._id;
  res.promise(cardService.setLike(params.cardId, userId));
};

var removeLike = (req: Request, res: ModifiedResponse) => {
  var { params, user } = req;
  var userId = user._id;
  res.promise(cardService.removeLike(params.cardId, userId));
};

var deleteById = (req: Request, res: ModifiedResponse) =>
  res.promise(cardService.deleteById(req.params.cardId));

export var cardController = {
  create,
  getAll,
  getById,
  setLike,
  removeLike,
  deleteById,
};
