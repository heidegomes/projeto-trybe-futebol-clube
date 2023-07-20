import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import MatchesModel from '../database/models/MatchesModel';
import { match41, matches, matchesFinished, matchesInProgress, nonExistentTeam, reqNewMatch, resNewMatch, resultUpdated, twoSameTeams } from './mocks/Matches.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Matches Test', function () {
  it('should return a matches list', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should only return matches in progress', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesInProgress as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('should return only finished matches', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesFinished as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesFinished);
  });

  it('should be possible to finish a match', async function () {
    sinon.stub(MatchesModel, 'update').resolves(match41 as any);

    const response = await chai.request(app)
      .patch('/matches/41/finish');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal({
      message: 'Finished'
    })
  });

  it('should be possible to update the result of a match', async function () {
    sinon.stub(MatchesModel, 'update').resolves(match41 as any);

    const response = await chai.request(app)
      .patch('/matches/:id')
      .send(resultUpdated)

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(resultUpdated)
  });

  it('should be possible to create a new match', async function () {
    sinon.stub(MatchesModel, 'create').resolves();

    const response = await chai.request(app)
      .post('/matches')
      .send(reqNewMatch)

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(resNewMatch)
  });

  it('should not be possible to create a new match with two same team', async function () {
    sinon.stub(MatchesModel, 'create').resolves();

    const response = await chai.request(app)
      .post('/matches')
      .send(twoSameTeams)

    expect(response).to.have.status(422);
    expect(response.body).to.deep.equal({
      message: "It is not possible to create a match with two equal teams"
    })
  });

  it('should not be possible to create a new match with the non-existent team', async function () {
    sinon.stub(MatchesModel, 'create').resolves();

    const response = await chai.request(app)
      .post('/matches')
      .send(nonExistentTeam)

    expect(response).to.have.status(422);
    expect(response.body).to.deep.equal({
      message: "There is no team with such id!"
    })
  });

  afterEach(sinon.restore);
});