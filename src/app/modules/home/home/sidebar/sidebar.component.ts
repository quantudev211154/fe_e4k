import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ISidebarItem } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { IconAllCourseComponent } from 'src/app/shared/icons/icon-all-course/icon-all-course.component';
import { IconDatabaseComponent } from 'src/app/shared/icons/icon-database/icon-database.component';
import { IconUserComponent } from 'src/app/shared/icons/icon-user/icon-user.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  currentUser = this.authService.authState.user;
  isOpenFullSidebar = false;
  sidebarItems: ISidebarItem[] = [
    {
      value: '/',
      icon: IconAllCourseComponent,
      label: 'Các khoá học',
      description: 'Các khoá học',
    },
    {
      value: '/words',
      icon: IconDatabaseComponent,
      label: 'Kho từ vựng',
      description: 'Kho từ vựng',
    },
    {
      value: '/users',
      icon: IconUserComponent,
      label: 'Tất cả người dùng',
      description: 'Tất cả người dùng',
    },
  ];
  selectedSidebarItem = this.sidebarItems[0];

  constructor(private authService: AuthService, private router: Router) {}

  openFullSidebar() {
    this.isOpenFullSidebar = true;
  }

  minimizeSidebar() {
    this.isOpenFullSidebar = false;
  }

  onClickSidebarItem(selectedItem: ISidebarItem) {
    if (this.selectedSidebarItem.value !== selectedItem.value)
      this.router.navigateByUrl(selectedItem.value);
    this.selectedSidebarItem = selectedItem;
  }
}
