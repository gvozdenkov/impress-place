/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from 'chai';
import request from 'supertest';
import { config } from '#config';
import { app } from '#app';
import { message } from '#messages';
import { USER } from '#user';
import { createUser, mapToTestDTO, randomeUser } from './user-dto';
import { setupTestDB } from './setup-test-db';
import { randomeString } from './util';

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
    it('Should create user', async () => {
      var { name, about, avatar } = randomeUser();

      await request(app)
        .post(`${basePath}`)
        .send({ name, about, avatar })
        .expect(201)
        .expect('Content-type', /json/)
        .then((res) => {
          var { status, data } = res.body;

          assert.equal(status, 'success');
          assert.include(data, {
            name,
            about,
            avatar,
          });
        });
    });
    it('Should throw 400 error with no name', async () => {
      var { about, avatar } = randomeUser();

      await request(app)
        .post(`${basePath}`)
        .send({ about, avatar })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationSchemaPathRequied('user', 'name'),
          });
        });
    });
    it(`Should throw 400 error with name longer then ${USER.nameMaxLength}`, async () => {
      var { about, avatar } = randomeUser();
      var invalidLength = USER.nameMaxLength + 1;
      var name = randomeString(invalidLength, invalidLength, '-');

      await request(app)
        .post(`${basePath}`)
        .send({ name, about, avatar })
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
      var { about, avatar } = randomeUser();
      var invalidLength = USER.nameMinLength - 1;
      var name = randomeString(invalidLength, invalidLength, '-');

      await request(app)
        .post(`${basePath}`)
        .send({ name, about, avatar })
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
      var { name, about, avatar } = randomeUser();
      name += '+';

      await request(app)
        .post(`${basePath}`)
        .send({ name, about, avatar })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationFailed('user', 'name', message.invalidName()),
          });
        });
    });
    it('Should throw 400 error with no about', async () => {
      var { name, avatar } = randomeUser();

      await request(app)
        .post(`${basePath}`)
        .send({ name, avatar })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationSchemaPathRequied('user', 'about'),
          });
        });
    });
    it(`Should throw 400 error with about longer then ${USER.aboutMaxLength}`, async () => {
      var { name, avatar } = randomeUser();
      var invalidLength = USER.aboutMaxLength + 1;
      var about = randomeString(invalidLength, invalidLength, '-');

      await request(app)
        .post(`${basePath}`)
        .send({ about, name, avatar })
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
      var { name, avatar } = randomeUser();
      var invalidLength = USER.aboutMinLength - 1;
      var about = randomeString(invalidLength, invalidLength, '-');

      await request(app)
        .post(`${basePath}`)
        .send({ about, name, avatar })
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
    it('Should throw 400 error with no avatar', async () => {
      var { name, about } = randomeUser();

      await request(app)
        .post(`${basePath}`)
        .send({ name, about })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.validationSchemaPathRequied('user', 'avatar'),
          });
        });
    });
    it('Should throw 400 error with invalid avatar url', async () => {
      var { name, about } = randomeUser();
      var avatar = 'invalid url';

      await request(app)
        .post(`${basePath}`)
        .send({ name, about, avatar })
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
