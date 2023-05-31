import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ESnackbarStatus, IAuthState } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { LoginService } from 'src/app/core/services/login-service/login.service';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'app-pa',
  templateUrl: './pa.component.html',
  styleUrls: ['./pa.component.scss'],
})
export class PaComponent implements OnInit {
  authState: IAuthState;

  changePwdForm: FormGroup;

  formError = '';

  isShowChangePwdModal = false;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((value) => {
      this.authState = value;
    });

    this.changePwdForm = this.fb.group({
      old: '',
      new: '',
    });
  }

  logout() {
    const choice = window.confirm('Bạn chắc chắn muốn đăng xuất chứ?');

    if (choice && this.authState.user)
      this.loginService.logout(this.authState.user._id);
  }

  openChangePasswordModal() {
    this.isShowChangePwdModal = true;
  }

  hideChangePasswordModal() {
    this.isShowChangePwdModal = false;
  }

  setFormDataError(message: string) {
    this.formError = message;

    const timeoutId = window.setTimeout(() => {
      this.formError = '';
    }, 5000);
  }

  isFormDataValid() {
    const data = this.changePwdForm.value;

    if (data.old === '') {
      this.setFormDataError('Hãy cung cấp mật khẩu cũ');
      return false;
    }

    if (data.new === '') {
      this.setFormDataError('Hãy cung cấp mật khẩu mới');
      return false;
    }

    if (data.new.length <= 5) {
      this.setFormDataError('Mật khẩu mới phải dài hơn 5 ký tự');
      return false;
    }

    return true;
  }

  onFormSubmit() {
    if (this.isFormDataValid()) {
      const data = this.changePwdForm.value;

      this.userService.changePassword(data.old, data.new).subscribe(
        (value: any) => {
          this.hideChangePasswordModal();
          this.changePwdForm.reset();
        },
        (err: any) => {
          this.setFormDataError('Mật khẩu cũ không khớp.');
        }
      );
    }
  }
}
