import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { API } from '../../constants';
import { ICourse } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpService: HttpService) {}

  public getCourseByType(courseType: string) {
    return this.httpService.get(
      `${API.GET_ALL_COURSE_URL}?courseType=${courseType}`
    );
  }

  public getCourseById(courseId: string) {
    return this.httpService.get(API.GET_COURSE_BY_ID_URL + courseId);
  }

  public createDraftCourse(title: string, description: string, level: string) {
    const body = { title, description, level };

    return this.httpService.post(API.CREATE_DRAFT_COURSE_URL, body);
  }

  public searchCourseByKeyword(keyword: string) {
    return this.httpService.get(
      `${API.SEARCH_COURSE_BY_KEYWORD_URL}?keyword=${keyword}`
    );
  }

  public updateCourse(course: ICourse) {
    return this.httpService.put(API.UPDATE_COURSE_URL, { course });
  }
}
