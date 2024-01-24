import { USER } from '../user';
import { generateStrOfLength } from './utils';

export var USER_FIELD_TEST = {
  name: {
    tooLong: generateStrOfLength(USER.nameMaxLength + 1),
    tooShort: generateStrOfLength(USER.nameMinLength - 1),
    validName: 'Это Valid-Name',
    invalidNameNumber: 'Name 777',
    invalidNameSpetial: 'Invalid%',
  },
  about: {
    tooLong: generateStrOfLength(USER.aboutMaxLength + 1),
    tooShort: generateStrOfLength(USER.aboutMinLength - 1),
    validAbout: 'Valid About',
  },
  avatar: {
    invalidAvatar: 'invalid link',
    validAvatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
} as const;
