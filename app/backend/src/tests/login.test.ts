import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcryptjs from 'bcryptjs';

// @ts-ignore
const chaiHttp = require('chai-http');

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
    it('não pode fazer login se o email não for informado', async function () {

      const response = await chai.request(app)
        .post(prefix)
        .send(loginWithoutEmail)
      expect(response).to.have.status(400);
      expect(response.body).to.deep.equal({
        message: 'All fields must be filled'
      })
    })
    it('não pode fazer login se o password não for informado', async function () {

      const response = await chai.request(app)
        .post(prefix)
        .send(loginWithoutPassword)
      expect(response).to.have.status(400);
      expect(response.body).to.deep.equal({
        message: 'All fields must be filled'
      })
    })
    it('não pode fazer login se o formato do email for inválido', async function () {

      const response = await chai.request(app)
        .post(prefix)
        .send(loginInvalidEmail)
      expect(response).to.have.status(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid email or password'
      })
    })
    it('não pode fazer login se o formato da senha for inválido', async function () {

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