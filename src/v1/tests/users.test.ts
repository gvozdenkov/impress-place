/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from 'chai';
import request from 'supertest';
import { app } from '#app';
import { basePathV1 } from '#v1';
import { message } from '#messages';
import { createUser, mapToTestDTO } from './utils/user-dto';
import { setupTestDB } from './utils/setup-test-db';

var basePath = `${basePathV1}/users`;

setupTestDB();

describe('User service', () => {
  // GET ========================================
  describe('Get all users', () => {
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
  describe(`Get user by id`, () => {
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

      var wrongId = 'someWrongId123';

      await request(app)
        .get(`${basePath}/${wrongId}`)
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
});
