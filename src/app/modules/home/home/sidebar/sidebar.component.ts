import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstant } from 'src/app/core/constants';
import { IAuthState, ISidebarItem, IUser } from 'src/app/core/models';
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
  currentUser: IUser | null = null;
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
      value: '/' + RouteConstant.ROUTE_TEST_BANK + '?page=1',
      icon: IconAllCourseComponent,
      label: 'Ngân hàng đề',
      description: 'Ngân hàng đề',
    },
    {
      value: '/' + RouteConstant.ROUTE_USERS + '?page=1',
      icon: IconUserComponent,
      label: 'Các người dùng cấp cao',
      description: 'Các người dùng cấp cao',
    },
  ];
  selectedSidebarItem = this.sidebarItems[0].value;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((data: IAuthState) => {
      this.currentUser = data.user;
    });

    // const currentUrl = this.router.url;

    // let currentRoute = currentUrl.split('/')[1].split('?')[0];

    // const matchResult = RouteConstant.ALL_ROUTES.find(
    //   (route) => route === currentRoute
    // );

    // if (!matchResult) {
    //   console.log('Rs: No match result - Sidebar component - 62');

    //   this.router.navigateByUrl('/');
    //   this.selectedSidebarItem = this.sidebarItems[0];
    //   return;
    // }
    // const specifiedRoute = this.sidebarItems.find((item) => {
    //   const itemRoute = item.value.substring(1, matchResult.length + 1);

    //   return itemRoute === matchResult;
    // });
    // if (!specifiedRoute) {
    //   console.log('Rs: No match result - Sidebar component -74');

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
    this.selectedSidebarItem = selectedItem.value;
  }

  goToPaPage() {
    this.router.navigateByUrl('/pa');
    this.isOpenFullSidebar = false;
    this.selectedSidebarItem = 'pa';
  }
}
