import { Card } from './card.model';

var getAll = async () => Card.find({});

var getById = (id: string) => Card.findById(id).orFail();
var deleteById = async (id: string) => Card.findByIdAndDelete(id).orFail();

type CreateUser = {
  name: string;
  link: string;
  owner: string;
};

var create = async ({ name, link, owner }: CreateUser) => {
  var card = new Card({ name, link, owner });
  return card.save();
};

export var cardService = {
  create,
  getAll,
  getById,
  deleteById,
};
