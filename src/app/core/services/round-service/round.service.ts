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
}
