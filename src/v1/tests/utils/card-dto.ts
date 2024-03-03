/* eslint-disable no-underscore-dangle */
import { CardDocument } from '#card';

export var mapCardToTestDTO = (card: CardDocument) => ({
  name: card.name,
  link: card.link,
  likes: [],
  _id: card._id.toString(),
  owner: card.owner,
});
