import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { COMMON_KEY } from '../constants';
import { LoaderService } from '../services/loader-service/load.service';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-service/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private tokenStorageService: TokenStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();

    let authRequest = req;
    const token = this.tokenStorageService.getToken();

    if (token) {
      const headers = new HttpHeaders()
        .append(COMMON_KEY.TOKEN_HEADER_KEY, `Bearer ${token}`)
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        )
        .append('Access-Control-Allow-Origin', '*');

      authRequest = req.clone({ headers });
    }

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this.gotoErrorPage(error.status);
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }

  gotoErrorPage(status: number) {
    if (status === 401) this.router.navigateByUrl('/login');
  }
}

export const AuthInterceptorProvides = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
