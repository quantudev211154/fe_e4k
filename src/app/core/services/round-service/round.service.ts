import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { API } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  constructor(private httpService: HttpService) {}

  createNewRound(courseId: string, lessionId: string, round: any) {
    const fullUrl = `${API.CREATE_NEW_ROUND_URL}/${courseId}/${lessionId}`;

    return this.httpService.post(fullUrl, { round });
  }

  getAllRounds(courseId: string, lessionId: string) {
    const fullUrl = `${API.CREATE_NEW_ROUND_URL}?courseId=${courseId}&lessionId=${lessionId}`;

    return this.httpService.get(fullUrl);
  }

  deleteRound(courseId: string, lessionId: string, roundId: string) {
    const fullUrl = `${API.DELETE_ROUND_URL}/${courseId}/${lessionId}/${roundId}`;

    return this.httpService.delete(fullUrl);
  }

  getRound(courseId: string, lessionId: string, roundId: string) {
    const fullUrl = `${API.GET_ROUND_URL}/${courseId}/${lessionId}/${roundId}`;

    return this.httpService.get(fullUrl);
  }
}
