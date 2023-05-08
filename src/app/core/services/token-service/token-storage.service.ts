import { Injectable } from '@angular/core';
import { COMMON_KEY } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public removeToken() {
    window.localStorage.removeItem(COMMON_KEY.TOKEN_KEY);
  }

  public saveToken(token: string) {
    window.localStorage.setItem(COMMON_KEY.TOKEN_KEY, token);
  }

  public getToken() {
    return window.localStorage.getItem(COMMON_KEY.TOKEN_KEY);
  }
}
