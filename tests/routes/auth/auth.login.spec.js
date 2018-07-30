import { expect } from 'chai';
import server from '../../utils/server.mock';
import User from '../../../app/models/user';
import UserFactory from '../../factories/user.factory';

const ENDPOINT = '/auth/login';
let defaultUserPayload = UserFactory.generate();
let savedUser;

describe(`POST ${ENDPOINT}`, () => {
  before(() => {
    return User.remove({})
      .then(() => User.create(defaultUserPayload))
      .then(u => savedUser = u);
  });

  describe('#200', () => {
    it('return an auth token upon successful password verification', () => {
      return server.post(ENDPOINT)
        .send({username: savedUser.username, password: defaultUserPayload.password})
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body.token).to.be.defined;
        });
    });
  });

  describe('#400', () => {
    it('correct username, incorrect password', done => {
      server.post(ENDPOINT)
        .send({username: savedUser.username, password: 'wrong'})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Incorrect password.');
          done();
        });
    });

    it('incorrect username, incorrect password', done => {
      server.post(ENDPOINT)
        .send({username: 'wrong', password: 'wrong'})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Username does not match any records.');
          done();
        });
    });
  })
});
