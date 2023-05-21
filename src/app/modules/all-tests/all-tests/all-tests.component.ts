import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteConstant } from 'src/app/core/constants';
import { ITest } from 'src/app/core/models';
import { DateService } from 'src/app/core/services/date-service/date.service';
import { ScrollService } from 'src/app/core/services/scroll-service/scroll.service';
import { TestService } from 'src/app/core/services/test-service/test.service';

@Component({
  selector: 'app-all-tests',
  templateUrl: './all-tests.component.html',
  styleUrls: ['./all-tests.component.scss'],
})
export class AllTestsComponent implements OnInit {
  allTest: ITest[] = [];

  currentPage = 1;

  constructor(
    private router: Router,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private scrollService: ScrollService,
    public dateService: DateService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const page = params['page'];

      this.currentPage = page ? page : 1;

      this.getTests(this.currentPage);
    });
  }

  getTests(page: number) {
    this.testService.getAllTests(this.currentPage).subscribe((res: any) => {
      console.log(res.data.tests);
      this.allTest = res.data.tests;
    });

    this.scrollService.scrollToTop();
  }

  goToAddTestRoute() {
    this.router.navigateByUrl(
      `${RouteConstant.ROUTE_TEST_BANK}/customize-test`
    );
  }

  goToNextPage() {
    this.currentPage++;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });

    this.getTests(this.currentPage);
  }

  goToPreviousPage() {
    this.currentPage--;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });

    this.getTests(this.currentPage);
  }
}
