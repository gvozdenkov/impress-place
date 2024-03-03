/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from 'chai';
import request from 'supertest';
import { app } from '#app';
import { basePathV1 } from '#v1';
import { message } from '#messages';
import { User, UserDocument } from '#user';
import { createUser, getReqCookies, mapUserToTestDTO, setupTestDB, testUserOne } from './utils';

var basePath = `${basePathV1}/users`;
var logedInUser: UserDocument;

setupTestDB();

describe('User service', () => {
  // GET ========================================
  describe('Get all users', () => {
    beforeEach((done) => {
      User.create(testUserOne).then((user) => {
        logedInUser = user;
        done();
      });
    });
    it('Should return all users', async () => {
      var { email, password } = testUserOne;
      var user1 = await createUser();
      var user2 = await createUser();

      var cookies = await getReqCookies({ email, password });

      await request(app)
        .get(`${basePath}`)
        .set('Cookie', [...cookies])
        .expect(200)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'success',
            data: [mapUserToTestDTO(logedInUser), mapUserToTestDTO(user1), mapUserToTestDTO(user2)],
          });
        });
    });
  });
  describe(`Get user by id`, () => {
    beforeEach((done) => {
      User.create(testUserOne).then((user) => {
        logedInUser = user;
        done();
      });
    });
    it('Should return user by id', async () => {
      var { email, password } = testUserOne;
      var _id = logedInUser._id.toString();

      var cookies = await getReqCookies({ email, password });

      await request(app)
        .get(`${basePath}/${_id}`)
        .set('Cookie', [...cookies])
        .expect(200)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'success',
            data: mapUserToTestDTO(logedInUser),
          });
        });
    });
    it('Should fail "User not found" for wrong id', async () => {
      var { email, password } = testUserOne;

      var cookies = await getReqCookies({ email, password });
      var wrongId = 'someWrongId123';

      await request(app)
        .get(`${basePath}/${wrongId}`)
        .set('Cookie', [...cookies])
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
