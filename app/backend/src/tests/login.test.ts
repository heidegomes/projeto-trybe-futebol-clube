import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { describe } from 'mocha';
import { App } from '../app';
import UsersModel from '../database/models/UsersModel';
import { loginInvalidEmail, loginInvalidPassword, loginValidData, loginWithoutEmail, loginWithoutPassword, userMock } from './mocks/Users.mock';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test Login', function () {
  const prefix = '/login';

  afterEach(function () {
    sinon.restore();
  })

  describe('Successful login', function () {
    it('should login with valid credentials', async function () {
      sinon.stub(bcryptjs, 'compareSync').returns(true);

      sinon.stub(UsersModel, 'findOne').resolves(userMock as UsersModel);

      const response = await chai.request(app)
        .post(prefix)
        .send(loginValidData)
      expect(response).to.have.status(200);
      expect(response.body).to.haveOwnProperty('token');
    })
  })
  describe('failure', function () {
    it('cannot log in if an email is not provided', async function () {

      const response = await chai.request(app)
        .post(prefix)
        .send(loginWithoutEmail)
      expect(response).to.have.status(400);
      expect(response.body).to.deep.equal({
        message: 'All fields must be filled'
      })
    })
    it('cannot log in if a password is not provided', async function () {

      const response = await chai.request(app)
        .post(prefix)
        .send(loginWithoutPassword)
      expect(response).to.have.status(400);
      expect(response.body).to.deep.equal({
        message: 'All fields must be filled'
      })
    })
    it('cannot login if email format is invalid', async function () {

      const response = await chai.request(app)
        .post(prefix)
        .send(loginInvalidEmail)
      expect(response).to.have.status(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid email or password'
      })
    })
    it('cannot login if password format is invalid', async function () {

      const response = await chai.request(app)
        .post(prefix)
        .send(loginInvalidPassword)
      expect(response).to.have.status(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid email or password'
      })
    })
  })
})