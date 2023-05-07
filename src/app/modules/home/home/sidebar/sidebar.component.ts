import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstant } from 'src/app/core/constants';
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
export class SidebarComponent implements OnInit {
  currentUser = this.authService.authState.user;
  isOpenFullSidebar = false;
  sidebarItems: ISidebarItem[] = [
    {
      value: '/' + RouteConstant.ROUTE_HOME,
      icon: IconAllCourseComponent,
      label: 'Các khoá học',
      description: 'Các khoá học',
    },
    {
      value: '/' + RouteConstant.ROUTE_WORDS + '?page=1',
      icon: IconDatabaseComponent,
      label: 'Kho từ vựng',
      description: 'Kho từ vựng',
    },
    {
      value: '/' + RouteConstant.ROUTE_USERS + '?page=1',
      icon: IconUserComponent,
      label: 'Tất cả người dùng',
      description: 'Tất cả người dùng',
    },
  ];
  selectedSidebarItem = this.sidebarItems[0];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // const currentUrl = this.router.url;
    // let currentRoute = currentUrl.split('/')[1];
    // const matchResult = RouteConstant.ALL_ROUTES.find(
    //   (route) => route === currentRoute
    // );
    // if (!matchResult) {
    //   this.router.navigateByUrl('/');
    //   this.selectedSidebarItem = this.sidebarItems[0];
    //   return;
    // }
    // const specifiedRoute = this.sidebarItems.find((item) => {
    //   const itemRoute = item.value.substring(1, item.value.length);
    //   return itemRoute === matchResult;
    // });
    // if (!specifiedRoute) {
    //   this.router.navigateByUrl('/');
    //   this.selectedSidebarItem = this.sidebarItems[0];
    //   return;
    // }
    // this.selectedSidebarItem = specifiedRoute;
  }

  openFullSidebar() {
    this.isOpenFullSidebar = true;
  }

  minimizeSidebar() {
    this.isOpenFullSidebar = false;
  }

  onClickSidebarItem(selectedItem: ISidebarItem) {
    this.router.navigateByUrl(selectedItem.value);
    this.isOpenFullSidebar = false;
    this.selectedSidebarItem = selectedItem;
  }
}
