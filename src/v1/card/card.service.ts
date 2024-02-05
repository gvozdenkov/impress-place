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

var create = async ({ name, link, owner }: CreateUser) => {
  var card = new Card({ name, link, owner });
  return card.save();
};

var getAll = async () => Card.find({}).lean().orFail();

var getById = async (id: string) => Card.findById(id).orFail();

var setLike = async (id: string, userId: string) =>
  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, updateOptions).orFail();

var removeLike = async (id: string, userId: string) =>
  Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, updateOptions).orFail();

var deleteById = async (id: string) => Card.findByIdAndDelete(id).orFail();

export var cardService = {
  create,
  getAll,
  getById,
  setLike,
  removeLike,
  deleteById,
};
