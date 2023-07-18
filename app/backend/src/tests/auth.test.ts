import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import chaiHttp = require('chai-http');

import { describe } from 'mocha';
import { App } from '../app';
import { authWithoutToken, decodedUser, invalidToken, tokenValidData } from './mocks/Auth.mock';
import UsersModel from '../database/models/UsersModel';
import TokenValidate from '../middlewares/Tokenvalidate';
import { userMock } from './mocks/Users.mock';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test authentication', function () {
  const prefix = '/login/role';

  afterEach(function () {
    sinon.restore();
  })

  describe('Successful authentication', function () {
    it('should authentication with valid token', async function () {

      sinon.stub(UsersModel, 'findByPk').resolves(userMock as UsersModel);
      sinon.stub(jwt, 'verify').returns(decodedUser as any);

      const response = await chai.request(app)
        .get(prefix)
        .set('Authorization', tokenValidData)
      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal({
        "role": "admin"
      });
    })
  })
  describe('failure authentication', function () {
    it('cannot be authenticated if a token is not provided', async function () {

      const response = await chai.request(app)
        .get(prefix)
        .set('Authorization', authWithoutToken)
      expect(response).to.have.status(401);
      expect(response.body).to.deep.equal({
        message: 'Token not found'
      })
    })
    it('cannot be authenticated if token is invalid', async function () {

      const response = await chai.request(app)
        .get(prefix)
        .set('Authorization', invalidToken)
      expect(response).to.have.status(401);
      expect(response.body).to.deep.equal({
        message: 'Token must be a valid token'
      })
    })
  })
})