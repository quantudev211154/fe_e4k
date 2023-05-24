import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EUserRole, IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { DateService } from 'src/app/core/services/date-service/date.service';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  currentUser: IUser | null = null;

  allUsers: IUser[] = [];

  searchResult: IUser[] = [];
  searchDebounce = -1;

  isShowAddUserModal = false;
  addUserForm: FormGroup;
  formError = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    public dateService: DateService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.authService.authState.subscribe((value) => {
      this.currentUser = value.user;
    });
    this.addUserForm = this.fb.group({
      username: '',
      phone: '',
      role: EUserRole.MANAGER,
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.allUsers = res.data.users;
    });
  }

  deleteUser(userId: string) {
    const choice = window.confirm(
      'Bạn chắc chắn muốn xoá người dùng này khỏi hệ thống?'
    );

    if (choice) {
      this.userService.deleteUser(userId).subscribe((res: any) => {
        const { updatedUser } = res.data;

        this.allUsers = this.allUsers.filter(
          (user) => user._id.toString() != updatedUser._id.toString()
        );
      });
    }
  }

  onSearchUserInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    window.clearTimeout(this.searchDebounce);

    if (value === '') {
      this.searchResult = [];
      return;
    }

    this.searchDebounce = window.setTimeout(() => {
      this.userService.findUsers(value).subscribe((res: any) => {
        this.searchResult = res.data.users;
      });
    }, 500);
  }

  showModalAddUser() {
    this.isShowAddUserModal = true;
  }

  hideModalAddUser() {
    this.isShowAddUserModal = false;
  }

  checkExistPhone(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.value === '') return;

    this.userService.getUserByPhone(target.value).subscribe((res: any) => {
      if (res.data.user) {
        this.showAddUserModalFormError(
          'Số điện thoại này đã được dùng bởi người khác.'
        );
        return;
      }
    });
  }

  showAddUserModalFormError(message: string) {
    this.formError = message;

    const timeoutId = window.setTimeout(() => {
      this.formError = '';
      window.clearTimeout(timeoutId);
    }, 3000);
  }

  onAddNewUser() {
    const { username, phone, role } = this.addUserForm.value;

    if (username === '') {
      this.showAddUserModalFormError(
        'Đừng để trống tên hiển thị của người dùng mới'
      );
      return;
    }

    if (phone === '') {
      this.showAddUserModalFormError(
        'Đừng để trống số điện thoại của người dùng mới'
      );
      return;
    }

    this.userService.addNewUser('0' + phone, username, role).subscribe(
      (res: any) => {
        this.allUsers = [...this.allUsers, res.data.newUser];
        this.addUserForm.reset();
        this.hideModalAddUser();
      },
      (error) =>
        this.showAddUserModalFormError(
          'Có thể số điện thoại này đã được dùng bởi người khác.'
        )
    );
  }
}
