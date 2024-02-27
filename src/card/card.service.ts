import { QueryOptions } from 'mongoose';
import { CardId, UserId } from '#types';
import { Card, CardSchema } from './card.model';

type CreateUser = {
  name: string;
  link: string;
  owner: UserId;
};

var updateOptions: QueryOptions<CardSchema> = {
  returnDocument: 'after',
};

var create = async ({ name, link, owner }: CreateUser) => await Card.create({ name, link, owner });

var getAll = async () => await Card.find({}).orFail();

var getById = async (id: CardId) => await Card.findById(id).orFail();

var setLike = async (id: CardId, userId: UserId) =>
  await Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, updateOptions).orFail();

var removeLike = async (id: CardId, userId: UserId) =>
  await Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, updateOptions).orFail();

var deleteById = async (id: CardId) => await Card.findByIdAndDelete(id).orFail();

export var cardService = {
  create,
  getAll,
  getById,
  setLike,
  removeLike,
  deleteById,
};
