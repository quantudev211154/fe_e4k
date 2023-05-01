import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  ERR_LOGIN_FAILED,
  ERR_MUST_PROVIDE_LOGIN_INFO,
} from 'src/app/core/constants';
import { LoginService } from 'src/app/core/services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginError = '';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  setLoginErrorMessage(message: string) {
    this.loginError = message;

    const messageTimeoutId = window.setTimeout(() => {
      this.loginError = '';
      window.clearTimeout(messageTimeoutId);
    }, 3000);
  }

  onLoginFailure() {
    this.setLoginErrorMessage(ERR_LOGIN_FAILED);
  }

  onLoginFormSubmit() {
    const { phone, password } = this.loginForm.value;

    if (phone === '' || password === '')
      this.setLoginErrorMessage(ERR_MUST_PROVIDE_LOGIN_INFO);

    this.loginService.login(phone, password, () => this.onLoginFailure());
  }
}
