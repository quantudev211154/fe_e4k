import { Injectable } from '@angular/core';
import { IAuthState } from '../../models';
import { API, AUTH_STATE_INIT_VALUE } from '../../constants';
import { HttpService } from '../http-services/http.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-service/token-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: BehaviorSubject<IAuthState> = new BehaviorSubject<IAuthState>(
    AUTH_STATE_INIT_VALUE
  );
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  public setAuthState(newAuthState: IAuthState): void {
    this.authState.next({
      ...this.authState.value,
      ...newAuthState,
    });
    this.isLoggedIn.next(newAuthState.isAuth);
  }

  public getAuthState() {
    return this.authState;
  }

  public resetAuthState() {
    this.isLoggedIn.next(false);
    this.authState.next(AUTH_STATE_INIT_VALUE);
  }

  public checkSSO() {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigateByUrl('/login');
      this.authState.next({
        isAuth: false,
        user: null,
      });
      this.isLoggedIn.next(false);
      return;
    }

    this.httpService.get(API.CHECK_SSO_URL).subscribe({
      next: (res: any) => {
        const { data } = res;

        this.tokenStorageService.saveToken(data.accessToken);

        const newAuthState: IAuthState = {
          isAuth: true,
          user: {
            phone: data.user.phone,
            role: data.user.role,
            username: data.user.username,
            _id: data.user._id,
            registerDate: new Date(data.user.registerDate),
          },
        };

        this.setAuthState(newAuthState);
      },
      error: () => {
        this.tokenStorageService.removeToken();

        this.authState.next({
          isAuth: false,
          user: null,
        });
        this.isLoggedIn.next(false);

        this.router.navigateByUrl('/login');
      },
    });
  }
}
