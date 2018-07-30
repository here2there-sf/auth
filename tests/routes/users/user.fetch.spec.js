import { expect } from 'chai';
import server from '../../utils/server.mock';
import User from '../../../app/models/user';
import UserFactory from '../../factories/user.factory';

const ENDPOINT = '/user';

let savedUser;
describe(`GET ${ENDPOINT}`, () => {
  before(() => {
    return User.remove({})
      .then(() => User.create(UserFactory.generate()))
      .then(u => savedUser = u);
  });

  describe('#404', () => {
    it('return 404 if username does not exist', done => {
      server.get(`${ENDPOINT}/doesnotexist`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

describe(`GET ${ENDPOINT}`, () => {
  before(() => {
    return User.remove({})
      .then(() => User.create(UserFactory.generate()))
      .then(u => savedUser = u);
  });

  describe('#200', () => {
    it('should return the current user\'s profile', done => {
      server.get(`${ENDPOINT}`)
        .set('Authorization', savedUser.generateToken())
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.username).to.equal(savedUser.username);
          done();
        });
    });
  });

  describe('#401', () => {
    it('should return Unauthorized if wrong token is provided', done => {
      server.get(`${ENDPOINT}`)
        .set('Authorization', 'wrongtoken')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
