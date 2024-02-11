import { QueryOptions } from 'mongoose';
import { ServiceReturnPromise } from '#types';
import { serviceReturn } from '#helpers';
import { Card, CardSchema } from './card.model';

type CreateUser = {
  name: string;
  link: string;
  owner: string;
};

var updateOptions: QueryOptions<CardSchema> = {
  returnDocument: 'after',
};

var create = async ({ name, link, owner }: CreateUser): ServiceReturnPromise => {
  var card = new Card({ name, link, owner });
  var savedCard = await card.save();
  return serviceReturn(savedCard, 201);
};

var getAll = async () => serviceReturn(await Card.find({}).lean().orFail());

var getById = async (id: string) => serviceReturn(await Card.findById(id).orFail());

var setLike = async (id: string, userId: string) =>
  serviceReturn(
    await Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, updateOptions).orFail(),
  );

var removeLike = async (id: string, userId: string) =>
  serviceReturn(
    await Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, updateOptions).orFail(),
  );

var deleteById = async (id: string) => serviceReturn(await Card.findByIdAndDelete(id).orFail());

export var cardService = {
  create,
  getAll,
  getById,
  setLike,
  removeLike,
  deleteById,
};
