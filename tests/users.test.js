import { expect } from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';

import { random } from './utils.js';

const baseUrl = 'http://localhost:8080/api/users/';

describe('Users API test Suite', () => {
  describe('GET /api/users/', () => {
    let res;

    before(async () => {
      res = await supertest(baseUrl).get('/');
    });

    it('Should return status 200', () => {
      expect(res.statusCode).to.equal(200);
    });

    it('Should return a JSON', () => {
      expect(res.headers['content-type']).to.include('application/json');
    });

    it('Should return a array of users', () => {
      expect(res.body).to.have.property('payload');
      expect(res.body.payload).to.be.an('array');
    });

    it('Should return users with required fields', () => {
      const firstUser = res.body.payload[0];

      expect(firstUser.pets).to.be.an('array');

      expect(firstUser).to.include.all.keys(
        '_id',
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'pets'
      );
    });
  });

  describe('PUT /api/users/:uid', () => {
    const newName = { first_name: faker.person.firstName() };
    let defaultRandomUser;
    let res;

    before(async () => {
      const getUsers = await supertest(baseUrl).get('/');
      const maxUsers = getUsers.body.payload.length;
      defaultRandomUser = getUsers.body.payload[random(maxUsers)];
    });

    it('Should return status 200', async () => {
      res = await supertest(baseUrl)
        .put(`/${defaultRandomUser._id}`)
        .send(newName);

      expect(res.statusCode).to.equal(200);
    });

    it('Should update the name of the randomUser', async () => {
      const getUser = await supertest(baseUrl).get(`/${defaultRandomUser._id}`);
      const updatedName = getUser.body.payload.first_name;

      expect(updatedName).to.equal(newName.first_name);
    });
  });

  describe('DELETE /api/users/:uid', () => {
    let randomUserId;

    before(async () => {
      const getUsers = await supertest(baseUrl).get('/');
      const maxUsers = getUsers.body.payload.length;
      const randomUser = getUsers.body.payload[random(maxUsers)];
      randomUserId = randomUser._id;
    });

    it('Should return status 200', async () => {
      const res = await supertest(baseUrl).delete(`/${randomUserId}`);
      expect(res.statusCode).to.equal(200);
    });

    it('Should delete the user', async () => {
      const getUsers = await supertest(baseUrl).get('/');
      const userStillExists = getUsers.body.payload.some(
        (user) => user._id === randomUserId
      );

      expect(userStillExists).to.be.false;
    });
  });
});
