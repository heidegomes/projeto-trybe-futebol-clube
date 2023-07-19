import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import MatchesModel from '../database/models/MatchesModel';
import { matches, matchesFinished, matchesInProgress, resultUpdated } from './mocks/Matches.mock';

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
    // sinon.stub(MatchesModel, 'findFinished').resolves(matchesFinished as any);

    const response = await chai.request(app)
      .patch('/matches/:id/finish');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal({
      message: 'Finished'
    })
  });

  it('should be possible to update the result of a match', async function () {
    // sinon.stub(MatchesModel, 'findFinished').resolves(matchesFinished as any);

    const response = await chai.request(app)
      .patch('/matches/:id')
      .send(resultUpdated)

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(resultUpdated)
  });

  afterEach(sinon.restore);
});