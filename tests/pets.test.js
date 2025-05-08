import supertest from 'supertest';
import { expect } from 'chai';

const baseUrl = 'http://localhost:8080/api/pets';

describe('Pets API test Suite', () => {
  describe('GET /api/pets/', () => {
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
      const firstPet = res.body.payload[0];

      expect(firstPet).to.include.all.keys(
        '_id',
        'name',
        'specie',
        'birthDate',
        'adopted',
        'owner',
        'image'
      );
    });
  });
});
