/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from 'chai';
import request from 'supertest';
import { app } from '#app';
import { basePathV1 } from '#v1';
import { message } from '#messages';
import { USER } from '#user';
import { randomeString } from '#utils';
import { createUser, randomeUser } from './utils/user-dto';
import { setupTestDB } from './utils/setup-test-db';

var registerPath = `${basePathV1}/signup`;

setupTestDB();
describe('Auth Service', () => {
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

    // ==================== Fail create new user ====================
    it('Should fail to create a new user, if email already exists', async () => {
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
    it(`Should fail to create a new user, if 'name' longer then ${USER.nameMaxLength}`, async () => {
      var invalidLength = USER.nameMaxLength + 1;
      var invalidName = randomeString(invalidLength, invalidLength);
      var user = randomeUser({ name: invalidName });

      await request(app)
        .post(`${registerPath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.maxLength('name', USER.nameMaxLength),
          });
        });
    });
    it(`Should fail to create a new user, if 'name' shorter then ${USER.nameMinLength}`, async () => {
      var invalidLength = USER.nameMinLength - 1;
      var invalidName = randomeString(invalidLength, invalidLength, ' -');
      var user = randomeUser({ name: invalidName });

      await request(app)
        .post(`${registerPath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.minLength('name', USER.nameMinLength),
          });
        });
    });
    it("should fail to create a new user, if 'name' have invalid cheracters", async () => {
      var invalidName = `${randomeString(USER.nameMinLength, USER.nameMaxLength)}+`;
      var user = randomeUser({ name: invalidName });

      await request(app)
        .post(`${registerPath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.invalidInput('name'),
          });
        });
    });
    it(`Should fail to create a new user, if 'about' longer then ${USER.aboutMaxLength}`, async () => {
      var invalidLength = USER.aboutMaxLength + 1;
      var invalidAbout = randomeString(invalidLength, invalidLength);
      var user = randomeUser({ about: invalidAbout });

      await request(app)
        .post(`${registerPath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.maxLength('about', USER.aboutMaxLength),
          });
        });
    });
    it(`Should fail to create a new user, if 'about' shorter then ${USER.aboutMinLength}`, async () => {
      var invalidLength = USER.aboutMinLength - 1;
      var invalidAbout = randomeString(invalidLength, invalidLength);
      var user = randomeUser({ about: invalidAbout });

      await request(app)
        .post(`${registerPath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.minLength('about', USER.nameMinLength),
          });
        });
    });
    it("Should fail to create a new user, if invalid 'avatar' url", async () => {
      var user = randomeUser({ avatar: 'invalid url' });

      await request(app)
        .post(`${registerPath}`)
        .send({ ...user })
        .expect(400)
        .expect('Content-type', /json/)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            status: 'fail',
            message: message.invalidUrl('avatar'),
          });
        });
    });
  });
});
