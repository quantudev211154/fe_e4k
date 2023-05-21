import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { INewTest } from '../../models';
import { API } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private httpService: HttpService) {}

  addTest(newTest: INewTest) {
    return this.httpService.post(API.CREATE_NEW_TEST_URL, {
      test: newTest,
    });
  }

  getAllTests(page: number) {
    return this.httpService.get(`${API.GET_ALL_TEST_URL}?page=${page}`);
  }
}
