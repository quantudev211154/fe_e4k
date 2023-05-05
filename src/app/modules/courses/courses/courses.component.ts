import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERR_MUST_PROVIDE_COURSE_INFO } from 'src/app/core/constants';
import { ICourse } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course-service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  allCourses: ICourse[] = [];

  isShowAddCourseModal = false;
  newCourseForm: FormGroup;
  newCourseFormError = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseService
      .getAllCourse()
      .subscribe((res: any) => (this.allCourses = res.data.courses));

    this.newCourseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  showAddCourseModal() {
    this.isShowAddCourseModal = true;
  }

  hideAddCourseModal() {
    this.isShowAddCourseModal = false;
  }

  setNewCourseErrorMessage(message: string) {
    this.newCourseFormError = message;

    const messageTimeoutId = window.setTimeout(() => {
      this.newCourseFormError = '';
      window.clearTimeout(messageTimeoutId);
    }, 3000);
  }

  onNewCourseFormSubmit() {
    const { title, description } = this.newCourseForm.value;

    if (title === '' || description === '')
      return this.setNewCourseErrorMessage(ERR_MUST_PROVIDE_COURSE_INFO);

    this.courseService
      .createDraftCourse(title, description)
      .subscribe((res) => {
        this.router.navigate(['course-detail', res.data.newCourse._id]);
      });
  }

  goToCourseDetailById(courseId: string) {
    this.router.navigate(['course-detail', courseId]);
  }
}
