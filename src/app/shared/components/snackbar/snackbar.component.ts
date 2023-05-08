import { Component, OnInit } from '@angular/core';
import { SNACKBAR_INIT_VALUE } from 'src/app/core/constants';
import { ESnackbarStatus, ISnackbar } from 'src/app/core/models';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  snackbarStatus = ESnackbarStatus;
  snackbarInfo = SNACKBAR_INIT_VALUE;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarService.snackbarStatus.subscribe((value: ISnackbar) => {
      this.snackbarInfo = value;
    });
  }
}
