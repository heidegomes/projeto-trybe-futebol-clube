import * as sinon from 'sinon';
import * as chai from 'chai';
import sequelize from '../database/models/index';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import { leaderBoardAway, leaderBoardGeneral, leaderBoardHome } from './mocks/Leaderboard.mock'

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Leaderboard Test', function () {
  it('should return the classification about home teams', async function () {
    sinon.stub(sequelize, 'query').resolves(leaderBoardHome as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderBoardHome);
  });

  it('should return the clasification about away teams', async function () {
    sinon.stub(sequelize, 'query').resolves(leaderBoardAway as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderBoardAway);
  });

    it('should return the geral cassification about teams', async function () {
    sinon.stub(sequelize, 'query').resolves(leaderBoardGeneral as any);

    const { status, body } = await chai.request(app).get('/leaderboard');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderBoardGeneral);
  });

  afterEach(sinon.restore);
});