import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { API } from '../../constants';
import { IAuthState } from '../../models';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-service/token-storage.service';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private httpService: HttpService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) {}

  public login(phone: string, password: string, onFailure?: Function) {
    const loginBody = { phone, password };

    this.httpService.post(API.LOGIN_URL, loginBody).subscribe(
      (res: any) => {
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
        this.authService.setAuthState(newAuthState);

        this.router.navigateByUrl('/');
      },
      (err: any) => {
        this.tokenStorageService.removeToken();

        if (onFailure) onFailure();
      }
    );
  }

  public logout(userId: string) {
    const currentUserId = userId;

    this.httpService
      .post(API.LOGOUT_URL, { id: currentUserId })
      .subscribe((res: any) => {
        this.tokenStorageService.removeToken();
        this.authService.resetAuthState();

        this.router.navigateByUrl('/login');
      });
  }
}
