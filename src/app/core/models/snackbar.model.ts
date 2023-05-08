export enum ESnackbarStatus {
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
}

export interface ISnackbar {
  isOpen: boolean;
  status: ESnackbarStatus;
  message: string;
}
