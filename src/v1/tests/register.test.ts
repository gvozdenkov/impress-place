/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from 'chai';
import request from 'supertest';
import { config } from '#config';
import { app } from '#app';
import { message } from '#messages';
import { USER } from '#user';
import { createUser, randomeUser } from './utils/user-dto';
import { setupTestDB } from './utils/setup-test-db';

var { basePath } = config;

var basePathV1 = `${basePath}/v1`;
var registerPath = `${basePathV1}/signup`;

setupTestDB();

describe('Register new user', () => {
  it("Should create new user with requied 'email', 'password', 'name', 'about', 'avatar'", async () => {
    var user = randomeUser();
    var { name, about, avatar, email } = user;

    await request(app)
      .post(registerPath)
      .send({ ...user })
      .expect(201)
      .expect('Content-type', /json/)
      .then((res) => {
        var { status, data } = res.body;

        assert.equal(status, 'success');
        assert.include(data, { name, about, avatar, email });
      });
  });
  it("Should create new user with 'email' and 'password' only", async () => {
    var user = randomeUser();
    var { email, password } = user;

    await request(app)
      .post(registerPath)
      .send({ email, password })
      .expect(201)
      .expect('Content-type', /json/)
      .then((res) => {
        var { status, data } = res.body;

        assert.equal(status, 'success');
        assert.include(data, {
          name: USER.nameDefault,
          about: USER.aboutDefault,
          avatar: USER.avatarDefault,
          email,
        });
      });
  });
  it('Created user should not contain password field', async () => {
    var user = randomeUser();

    await request(app)
      .post(registerPath)
      .send({ ...user })
      .expect(201)
      .expect('Content-type', /json/)
      .then((res) => {
        var { data } = res.body;

        assert.notProperty(data, 'password');
      });
  });
  it('Should create new user without name (with default name)', async () => {
    var user = randomeUser();
    var { about, avatar, email, password } = user;

    await request(app)
      .post(registerPath)
      .send({ about, avatar, email, password })
      .expect(201)
      .expect('Content-type', /json/)
      .then((res) => {
        var { status, data } = res.body;

        assert.equal(status, 'success');
        assert.include(data, { name: USER.nameDefault, about, avatar, email });
      });
  });

  it('Should create new user without about (with default about)', async () => {
    var user = randomeUser();
    var { name, avatar, email, password } = user;

    await request(app)
      .post(registerPath)
      .send({ name, avatar, email, password })
      .expect(201)
      .expect('Content-type', /json/)
      .then((res) => {
        var { status, data } = res.body;

        assert.equal(status, 'success');
        assert.include(data, { name, about: USER.aboutDefault, avatar, email });
      });
  });

  it('Should create new user without avatar (with default avatar)', async () => {
    var user = randomeUser();
    var { name, about, email, password } = user;

    await request(app)
      .post(registerPath)
      .send({ name, about, email, password })
      .expect(201)
      .expect('Content-type', /json/)
      .then((res) => {
        var { status, data } = res.body;

        assert.equal(status, 'success');
        assert.include(data, { name, about, avatar: USER.avatarDefault, email });
      });
  });
  it('Should not create a new user if email already exists', async () => {
    var user = randomeUser();
    await createUser({ ...user });
    var { email } = user;

    await request(app)
      .post(registerPath)
      .send({ ...user })
      .expect(409)
      .expect('Content-type', /json/)
      .then((res) => {
        assert.deepStrictEqual(res.body, {
          status: 'fail',
          message: message.existsEmail(email),
        });
      });
  });
});
