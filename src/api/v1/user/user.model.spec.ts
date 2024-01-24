import { HydratedDocument } from 'mongoose';
import { assert } from 'chai';
import { USER, User, UserSchema } from './user.model';
import { USER_FIELD_TEST } from '../test-config';

describe('user medel schema', () => {
  var user: HydratedDocument<UserSchema>;

  beforeEach(() => {
    user = new User({
      name: USER_FIELD_TEST.name.validName,
      about: USER_FIELD_TEST.about.validAbout,
      avatar: USER_FIELD_TEST.avatar.validAvatar,
    });
  });
  describe('name field', () => {
    it('have correct default value', () => {
      user = new User();
      assert.equal(user.name, USER.nameDefault);
    });
    it('have correct <min> validation errors message', () => {
      user.name = USER_FIELD_TEST.name.tooShort;

      var error = user.validateSync();

      assert.equal(error?.errors.name.message, `Must be at least ${USER.nameMinLength}`);
    });
    it('have correct <max> validation errors message', () => {
      user.name = USER_FIELD_TEST.name.tooLong;

      var error = user.validateSync();

      assert.equal(error?.errors.name.message, `Should be maximum ${USER.nameMaxLength}`);
    });
    it('contain only En, Ru, space or dash', () => {
      user.name = USER_FIELD_TEST.name.invalidNameNumber;

      var error = user.validateSync();

      assert.equal(
        error?.errors.name.message,
        `"${USER_FIELD_TEST.name.invalidNameNumber}" is not valid name`,
      );

      user.name = USER_FIELD_TEST.name.invalidNameSpetial;

      error = user.validateSync();

      assert.equal(
        error?.errors.name.message,
        `"${USER_FIELD_TEST.name.invalidNameSpetial}" is not valid name`,
      );
    });
  });
  describe('about field', () => {
    it('have correct default value', () => {
      user = new User();
      assert.equal(user.about, USER.aboutDefault);
    });
    it('have correct <min> validation', () => {
      user.about = USER_FIELD_TEST.about.tooShort;

      var error = user.validateSync();

      assert.equal(error?.errors.about.message, `Must be at least ${USER.aboutMinLength}`);
    });
    it('have correct <max> validation', () => {
      user.about = USER_FIELD_TEST.about.tooLong;

      var error = user.validateSync();

      assert.equal(error?.errors.about.message, `Should be maximum ${USER.aboutMaxLength}`);
    });
  });
  describe('avatar field', () => {
    it('have correct default value', () => {
      user = new User();

      assert.equal(user.avatar, USER.avatarDefault);
    });
    it('only allows valid links', () => {
      user.avatar = USER_FIELD_TEST.avatar.invalidAvatar;

      var error = user.validateSync();

      assert.equal(
        error?.errors.avatar.message,
        `"${USER_FIELD_TEST.avatar.invalidAvatar}" is not valid url`,
      );
    });
  });
});
