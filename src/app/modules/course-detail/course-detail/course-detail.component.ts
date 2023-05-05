import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course-service/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  currentCourse: ICourse;

  constructor(
    private courseService: CourseService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courseId = this.activateRoute.snapshot.paramMap.get('courseId');

    if (!courseId) {
      this.router.navigateByUrl('/');
      return;
    }

    this.courseService.getCourseById(courseId).subscribe((res: any) => {
      this.currentCourse = res.data.course;
    });
  }
}
