import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getAllMatches();
    res.status(200).json(serviceResponse.data);
  }
  // public async getFinished(_req: Request, res: Response) {
  //   const serviceResponse = await this.matchesService.getAllMatches();
  //   res.status(200).json(serviceResponse.data);
  // }
  // public async getInProgres(_req: Request, res: Response) {
  //   const serviceResponse = await this.matchesService.getAllMatches();
  //   res.status(200).json(serviceResponse.data);
  // }
}
