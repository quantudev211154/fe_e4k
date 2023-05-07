import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { API } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class LessionService {
  constructor(private httpService: HttpService) {}

  getLessionById(courseId: string, lessionId: string) {
    return this.httpService.get(
      `${API.GET_LESSION_BY_ID_URL}/${courseId}/${lessionId}`
    );
  }

  createNewLession(title: string, description: string, courseId: string) {
    const body = { title, description, courseId };

    return this.httpService.post(API.CREATE_LESSION_URL, body);
  }
}
