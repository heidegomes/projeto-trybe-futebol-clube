import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';


import { teams } from './mocks/Teams.mock';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams Test', function () {
  it('should return all teams', async function () {
    sinon.stub(TeamsModel, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
  afterEach(sinon.restore);
});