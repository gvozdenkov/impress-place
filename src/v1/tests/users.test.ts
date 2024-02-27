/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from 'chai';
import request from 'supertest';
import { config } from '#config';
import { app } from '#app';
import { message } from '#messages';
import { USER } from '#user';
import { randomeString } from '#utils';
import { createUser, mapToTestDTO, randomeUser } from './utils/user-dto';
import { setupTestDB } from './utils/setup-test-db';

var basePath = `${config.basePath}/users`;

setupTestDB();

describe(basePath, () => {
  // GET ========================================
  describe(`GET ${basePath}`, () => {
    it('Should return all users', async () => {
      var user1 = await createUser();
      var user2 = await createUser();

      await request(app)
        .get(`${basePath}`)
        .expect(200)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'success',
            data: [mapToTestDTO(user1), mapToTestDTO(user2)],
          });
        });
    });
  });
  describe(`GET ${basePath}/:userId`, () => {
    it('Should return user by id', async () => {
      var user = await createUser();
      var _id = user._id.toString();

      await request(app)
        .get(`${basePath}/${_id}`)
        .expect(200)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'success',
            data: mapToTestDTO(user),
          });
        });
    });
    it('Should throw 404 "User not found" for wrong id', async () => {
      await createUser();

      var _id = 'someWrongId123';

      await request(app)
        .get(`${basePath}/${_id}`)
        .expect(404)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.notFound('user'),
          });
        });
    });
  });

  // POST ========================================
  describe(`POST ${basePath}`, () => {
    it(`Should throw 400 error with name longer then ${USER.nameMaxLength}`, async () => {
      var invalidLength = USER.nameMaxLength + 1;
      var invalidName = randomeString(invalidLength, invalidLength, ' -');
      var user = randomeUser({ name: invalidName });

      await request(app)
        .post(`${basePath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationFailed(
              'user',
              'name',
              message.maxLength(USER.nameMaxLength),
            ),
          });
        });
    });
    it(`Should throw 400 error with name shorter then ${USER.nameMinLength}`, async () => {
      var invalidLength = USER.nameMinLength - 1;
      var invalidName = randomeString(invalidLength, invalidLength, ' -');
      var user = randomeUser({ name: invalidName });

      await request(app)
        .post(`${basePath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationFailed(
              'user',
              'name',
              message.minLength(USER.nameMinLength),
            ),
          });
        });
    });
    it(`Should throw 400 error with name have invalid cheracters`, async () => {
      var invalidName = `${randomeString(USER.nameMinLength, USER.nameMaxLength)}+`;
      var user = randomeUser({ name: invalidName });

      await request(app)
        .post(`${basePath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationFailed('user', 'name', message.invalidName()),
          });
        });
    });
    it(`Should throw 400 error with about longer then ${USER.aboutMaxLength}`, async () => {
      var invalidLength = USER.aboutMaxLength + 1;
      var invalidAbout = randomeString(invalidLength, invalidLength);
      var user = randomeUser({ about: invalidAbout });

      await request(app)
        .post(`${basePath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationFailed(
              'user',
              'about',
              message.maxLength(USER.aboutMaxLength),
            ),
          });
        });
    });
    it(`Should throw 400 error with about shorter then ${USER.aboutMinLength}`, async () => {
      var invalidLength = USER.aboutMinLength - 1;
      var invalidAbout = randomeString(invalidLength, invalidLength);
      var user = randomeUser({ about: invalidAbout });

      await request(app)
        .post(`${basePath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationFailed(
              'user',
              'about',
              message.minLength(USER.aboutMinLength),
            ),
          });
        });
    });
    it('Should throw 400 error with invalid avatar url', async () => {
      var user = randomeUser({ avatar: 'invalid url' });

      await request(app)
        .post(`${basePath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationFailed('user', 'avatar', message.invalidUrl()),
          });
        });
    });
  });
});
