import { QueryOptions } from 'mongoose';
import { Card, CardSchema } from './card.model';

type CreateUser = {
  name: string;
  link: string;
  owner: string;
};

var updateOptions: QueryOptions<CardSchema> = {
  returnDocument: 'after',
};

var create = async ({ name, link, owner }: CreateUser) => await Card.create({ name, link, owner });

var getAll = async () => await Card.find({}).orFail();

var getById = async (id: string) => await Card.findById(id).orFail();

var setLike = async (id: string, userId: string) =>
  await Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, updateOptions).orFail();

var removeLike = async (id: string, userId: string) =>
  await Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, updateOptions).orFail();

var deleteById = async (id: string) => await Card.findByIdAndDelete(id).orFail();

export var cardService = {
  create,
  getAll,
  getById,
  setLike,
  removeLike,
  deleteById,
};
