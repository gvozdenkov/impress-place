import mongoose from 'mongoose';
import { generateStrOfLength } from './utils';
import { CARD } from '../card';

export var CARD_FIELD_TEST = {
  name: {
    tooLong: generateStrOfLength(CARD.nameCardMaxLength + 1),
    tooShort: generateStrOfLength(CARD.nameCardMinLength - 1),
    validName: 'Valid Name',
  },
  likes: [new mongoose.Types.ObjectId()],
  link: {
    invalidLink: 'invalid link',
    validLink:
      'https://images.unsplash.com/photo-1668877334122-b60dd15bc1b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
  },
  owner: '65aa0a295a90a66b3fe4a32d',
};
