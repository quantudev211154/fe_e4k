import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { API } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpService: HttpService) {}

  public getAllCourse() {
    return this.httpService.get(API.GET_ALL_COURSE_URL);
  }

  public getCourseById(courseId: string) {
    return this.httpService.get(API.GET_COURSE_BY_ID_URL + courseId);
  }

  public createDraftCourse(title: string, description: string) {
    const body = { title, description };

    return this.httpService.post(API.CREATE_DRAFT_COURSE_URL, body);
  }
}
