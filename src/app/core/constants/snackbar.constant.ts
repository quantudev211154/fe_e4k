import { ESnackbarStatus, ISnackbar } from '../models';

export const SNACKBAR_INIT_VALUE: ISnackbar = {
  isOpen: false,
  status: ESnackbarStatus.INFO,
  message: '',
};

export const SNACKBAR_AUTO_HIDE_DURATION = 5000;
