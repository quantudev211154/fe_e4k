import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TokenStorageService } from '../token-service/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  options = {
    headers: new HttpHeaders({
      observe: 'response' as 'body',
    }),
    withCredentials: true,
  };

  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  get(url: string): Observable<any> {
    return this.httpClient.get<any>(url, this.options);
  }

  post(url: string, body: any, extraOptions?: any): Observable<any> {
    return this.httpClient.post<any>(url, body, {
      ...this.options,
      ...extraOptions,
    });
  }

  put(url: string, body: any, extraOptions?: any): Observable<any> {
    return this.httpClient.put<any>(url, body, {
      ...this.options,
      ...extraOptions,
    });
  }

  delete(url: string): Observable<any> {
    return this.httpClient.delete<any>(url);
  }
}
