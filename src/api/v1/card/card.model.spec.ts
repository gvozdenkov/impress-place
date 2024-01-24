import { HydratedDocument } from 'mongoose';
import { assert } from 'chai';
import { CARD, Card, CardSchema } from './card.model';
import { CARD_FIELD_TEST } from '../test-config';

describe('card model schema', () => {
  var card: HydratedDocument<CardSchema>;

  beforeEach(() => {
    card = new Card({
      name: CARD_FIELD_TEST.name.validName,
      likes: CARD_FIELD_TEST.likes,
      link: CARD_FIELD_TEST.link.validLink,
      owner: CARD_FIELD_TEST.owner,
    });
  });

  describe('name field', () => {
    it('have correct <min> validation errors message', () => {
      card.name = CARD_FIELD_TEST.name.tooShort;

      var error = card.validateSync();

      assert.equal(error?.errors.name.message, `Must be at least ${CARD.nameCardMinLength}`);
    });
    it('have correct <max> validation errors message', () => {
      card.name = CARD_FIELD_TEST.name.tooLong;

      var error = card.validateSync();

      assert.equal(error?.errors.name.message, `Should be maximum ${CARD.nameCardMaxLength}`);
    });
  });

  describe('link field', () => {
    it('only allows valid links', () => {
      card.link = CARD_FIELD_TEST.link.invalidLink;

      var error = card.validateSync();

      assert.equal(
        error?.errors.link.message,
        `"${CARD_FIELD_TEST.link.invalidLink}" is not valid url`,
      );
    });
  });
});
