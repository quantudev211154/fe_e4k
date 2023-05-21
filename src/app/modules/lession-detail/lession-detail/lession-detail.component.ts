import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILession } from 'src/app/core/models/course.model';
import { LessionService } from 'src/app/core/services/lession-service/lession.service';

@Component({
  selector: 'app-lession-detail',
  templateUrl: './lession-detail.component.html',
  styleUrls: ['./lession-detail.component.scss'],
})
export class LessionDetailComponent implements OnInit {
  currentCourseName: string = '';
  currentLession: ILession;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lessionService: LessionService
  ) {}

  ngOnInit(): void {
    const courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    const lessionId = this.activatedRoute.snapshot.paramMap.get('lessionId');

    if (!courseId || !lessionId) {
      console.log(
        'Rs: No CourseId or LessionId - lession detai component - 26'
      );

      this.router.navigateByUrl('/');
      return;
    }

    this.lessionService
      .getLessionById(courseId, lessionId)
      .subscribe((res: any) => {
        this.currentLession = res.data.lessions;
        this.currentCourseName = res.data.courseName;
      });
  }

  goToCourseDetail() {
    const courseId = this.activatedRoute.snapshot.paramMap.get('courseId');

    if (!courseId) {
      console.log('Rs: No courseId - Lession detail component - 45');

      this.router.navigateByUrl('/');
      return;
    }

    this.router.navigate(['course-detail', courseId]);
  }
}
