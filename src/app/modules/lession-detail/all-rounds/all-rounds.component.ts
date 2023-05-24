import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/core/models';
import { CourseService } from 'src/app/core/services/course-service/course.service';
import { DateService } from 'src/app/core/services/date-service/date.service';
import { RoundService } from 'src/app/core/services/round-service/round.service';

@Component({
  selector: 'app-all-rounds',
  templateUrl: './all-rounds.component.html',
  styleUrls: ['./all-rounds.component.scss'],
})
export class AllRoundsComponent implements OnInit {
  currentCourseId = '';
  currentLessionId = '';

  currentCourse: ICourse;

  allRounds: any = [];

  constructor(
    private router: Router,
    private roundService: RoundService,
    private activatedRoute: ActivatedRoute,
    public dateService: DateService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    const lessionId = this.activatedRoute.snapshot.paramMap.get('lessionId');

    if (courseId && lessionId) {
      this.currentCourseId = courseId;
      this.currentLessionId = lessionId;

      this.courseService
        .getCourseById(this.currentCourseId)
        .subscribe((res: any) => {
          this.currentCourse = res.data.course;
        });

      this.roundService
        .getAllRounds(this.currentCourseId, this.currentLessionId)
        .subscribe((res: any) => {
          this.allRounds = res.data.rounds;

          console.log(this.allRounds);
        });
    }
  }

  goToAddRoundPage() {
    const targetRoute = this.router.url + '/add-round?mode=add';

    this.router.navigateByUrl(targetRoute);
  }

  onDeleteRound(event: Event) {
    event.stopPropagation();

    const choice = window.confirm('Bạn thực sự muốn xoá màn chơi này?');

    if (choice) {
      const target = event.target as HTMLButtonElement;

      this.roundService
        .deleteRound(this.currentCourseId, this.currentLessionId, target.value)
        .subscribe((res: any) => {
          this.allRounds = res.data.rounds;
        });
    }
  }

  goToViewRoundPage(roundId: string) {
    const targetRoute =
      this.router.url + '/add-round?mode=view' + `&roundId=${roundId}`;

    this.router.navigateByUrl(targetRoute);
  }
}
