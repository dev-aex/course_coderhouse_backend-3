import { expect } from 'chai';
import supertest from 'supertest';
import { random } from '../utils.js';

const adoptionBaseUrl = 'http://localhost:8080/api/adoptions';
const usersBaseUrl = 'http://localhost:8080/api/users';
const petsBaseUrl = 'http://localhost:8080/api/pets';

describe('Adoptions API test Suite', () => {
  describe('GET /api/adoptions', () => {
    let res;

    before(async () => {
      res = await supertest(adoptionBaseUrl).get('/');
    });

    it('Should return status 200', () => {
      expect(res.statusCode).to.equal(200);
    });

    it('Should return a JSON', () => {
      expect(res.headers['content-type']).to.include('application/json');
    });

    it('Should return a array of adoptions', () => {
      expect(res.body).to.have.property('payload');
      expect(res.body.payload).to.be.an('array');

      const firstAdoption = res.body.payload[0];

      expect(firstAdoption).to.include.all.keys('_id', 'owner', 'pet');
    });
  });

  describe('GET /api/adoptions/:aid', () => {
    let res;
    let randomAdoption;

    before(async () => {
      const getAllAdoptions = await supertest(adoptionBaseUrl).get('/');

      const maxAdoptions = getAllAdoptions.body.payload.length;

      const getRandomNumber = random(maxAdoptions);

      randomAdoption = getAllAdoptions.body.payload[getRandomNumber];
    });

    it('Should return status 200', async () => {
      res = await supertest(adoptionBaseUrl).get(`/${randomAdoption._id}`);

      expect(res.statusCode).to.equal(200);
    });

    it('Should return a JSON', () => {
      expect(res.headers['content-type']).to.include('application/json');
    });

    it('Should return a specific adoption', () => {
      expect(res.body).to.have.property('payload');

      const payload = res.body.payload;

      expect(randomAdoption._id).to.equal(payload._id);
    });
  });

  describe('POST /api/adoptions/:uid/:pid', () => {
    let randomUser;
    let randomPet;

    before(async () => {
      const getAllUsers = await supertest(usersBaseUrl).get('/');
      const getAllPets = await supertest(petsBaseUrl).get('/');

      const maxUsers = getAllUsers.body.payload.length;
      const maxPets = getAllPets.body.payload.length;

      randomUser = getAllUsers.body.payload[random(maxUsers)];
      randomPet = getAllPets.body.payload[random(maxPets)];
    });

    it('Should return status 200', async () => {
      const res = await supertest(adoptionBaseUrl).post(
        `/${randomUser._id}/${randomPet._id}`
      );
      expect(res.statusCode).to.equal(200);
    });

    it('Should exits and have the same pet and user', async () => {
      const res = await supertest(adoptionBaseUrl).get('/');
      const adoptionFound = res.body.payload.some(
        (adoption) =>
          adoption.owner === randomUser._id && adoption.pet === randomPet._id
      );
      expect(adoptionFound).to.be.true;
    });
  });
});
