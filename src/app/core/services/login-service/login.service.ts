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
            phone: data.phone,
            role: data.role,
            username: data.username,
            _id: data._id,
            registerDate: new Date(data.registerDate),
          },
        };
        this.authService.setAuthState(newAuthState);

        console.log('Rs: Login failed - Login.service');

        this.router.navigateByUrl('/');
      },
      (err: any) => {
        this.tokenStorageService.removeToken();

        if (onFailure) onFailure();
      }
    );
  }

  public logout() {
    this.authService.authState.subscribe((data: IAuthState) => {
      const currentUserId = data.user?._id;

      this.httpService.post(API.LOGOUT_URL, { id: currentUserId });

      this.tokenStorageService.removeToken();
      this.authService.resetAuthState();

      this.router.navigateByUrl('/login');
    });
  }
}
