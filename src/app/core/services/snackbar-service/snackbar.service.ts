import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ESnackbarStatus, ISnackbar } from '../../models';
import {
  SNACKBAR_AUTO_HIDE_DURATION,
  SNACKBAR_INIT_VALUE,
} from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public snackbarStatus: BehaviorSubject<ISnackbar> =
    new BehaviorSubject<ISnackbar>(SNACKBAR_INIT_VALUE);

  constructor() {}

  public showSnackbar(status: ESnackbarStatus, message: string) {
    this.snackbarStatus.next({
      isOpen: true,
      status,
      message,
    });

    const timeoutId = window.setTimeout(() => {
      this.snackbarStatus.next(SNACKBAR_INIT_VALUE);
      window.clearTimeout(timeoutId);
    }, SNACKBAR_AUTO_HIDE_DURATION);
  }
}
