import { Card } from './card.model';

var getAll = async () => Card.find({});

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
};
