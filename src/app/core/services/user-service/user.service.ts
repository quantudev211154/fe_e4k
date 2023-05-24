import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { API } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpService) {}

  getAllUsers() {
    return this.httpService.get(API.GET_ALL_USERS_URL);
  }

  deleteUser(userId: string) {
    return this.httpService.delete(`${API.DELETE_USER_URL}/${userId}`);
  }

  findUsers(keyword: string) {
    return this.httpService.get(`${API.FIND_USER_URL}${keyword}`);
  }

  getUserByPhone(phone: string) {
    return this.httpService.get(`${API.GET_USER_BY_PHONE_URL}${phone}`);
  }

  addNewUser(phone: string, username: string, role: string) {
    const payload = { phone, username, role };

    return this.httpService.post(API.ADD_NEW_USER_URL, payload);
  }
}
