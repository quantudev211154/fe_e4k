import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Observable, first, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return true;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | boolean => {
  return inject(PermissionService).canActivate(next, state);
};
