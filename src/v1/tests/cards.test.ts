/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from 'chai';
import request from 'supertest';
import { app } from '#app';
import { message } from '#messages';
import { User, UserDocument } from '#user';
import { basePathV1 } from '#v1';
import { getReqCookies, setupTestDB, testUserOne } from './utils';
import { testCardOne } from './utils/setup-test-db';
import { mapCardToTestDTO } from './utils/card-dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var logedInUser: UserDocument;

var basePath = `${basePathV1}/cards`;

setupTestDB();

describe('Card service', () => {
  describe('Create new card', () => {
    beforeEach((done) => {
      User.create(testUserOne).then((user) => {
        logedInUser = user;
        done();
      });
    });
    it('Loged in user should create a new card', async () => {
      var { email, password } = testUserOne;
      var { name, link } = testCardOne;

      var cookies = await getReqCookies({ email, password });

      await request(app)
        .post(basePath)
        .set('Cookie', [...cookies])
        .send({ name, link })
        .expect(200)
        .expect('Content-type', /json/)
        .then((res) => {
          var createdCard = res.body.data;

          assert.deepStrictEqual(res.body, {
            status: 'success',
            data: mapCardToTestDTO(createdCard),
          });
        });
    });
    it('Loged out user should not create a card', async () => {
      var { name, link } = testCardOne;

      await request(app)
        .post(basePath)
        .send({ name, link })
        .expect(401)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.unauthorized(),
          });
        });
    });
  });
});
