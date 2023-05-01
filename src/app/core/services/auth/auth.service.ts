import { Injectable } from '@angular/core';
import { IAuthState } from '../../models';
import { API, AUTH_STATE_INIT_VALUE } from '../../constants';
import { HttpService } from '../http-services/http.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-service/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: IAuthState;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
    this.authState = AUTH_STATE_INIT_VALUE;
  }

  public setAuthState(newAuthState: IAuthState): void {
    this.authState = {
      ...this.authState,
      ...newAuthState,
    };
  }

  public getAuthState(): IAuthState {
    return this.authState;
  }

  public resetAuthState() {
    this.authState = AUTH_STATE_INIT_VALUE;
  }

  public checkSSO() {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.httpService.get(API.CHECK_SSO_URL).subscribe(
      (res) => {
        const { data } = res;

        this.tokenStorageService.saveToken(data.accessToken);

        const newAuthState: IAuthState = {
          isAuth: true,
          user: {
            phone: data.phone,
            role: data.role,
            username: data.username,
            _id: data._id,
            registerDate: new Date(data.registerDate),
          },
        };
        this.setAuthState(newAuthState);

        this.router.navigateByUrl('');
      },
      (error) => {
        this.tokenStorageService.removeToken();

        this.router.navigateByUrl('/login');
      }
    );
  }
}
