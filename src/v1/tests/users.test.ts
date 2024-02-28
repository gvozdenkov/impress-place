/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from 'chai';
import request from 'supertest';
import { app } from '#app';
import { basePathV1 } from '#v1';
import { message } from '#messages';
import { User, UserDocument } from '#user';
import { createUser, getReqCookies, mapToTestDTO, setupTestDB, testDefaultUser } from './utils';

var basePath = `${basePathV1}/users`;
var logedInUser: UserDocument;

setupTestDB();

describe('User service', () => {
  // GET ========================================
  describe('Get all users', () => {
    beforeEach((done) => {
      User.create(testDefaultUser).then((user) => {
        logedInUser = user;
        done();
      });
    });
    it('Should return all users', async () => {
      var { email, password } = testDefaultUser;
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
            data: [mapToTestDTO(logedInUser), mapToTestDTO(user1), mapToTestDTO(user2)],
          });
        });
    });
  });
  describe(`Get user by id`, () => {
    beforeEach((done) => {
      User.create(testDefaultUser).then((user) => {
        logedInUser = user;
        done();
      });
    });
    it('Should return user by id', async () => {
      var { email, password } = testDefaultUser;
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
            data: mapToTestDTO(logedInUser),
          });
        });
    });
    it('Should fail "User not found" for wrong id', async () => {
      var { email, password } = testDefaultUser;

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
