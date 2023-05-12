import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  COURSE_TYPE,
  ERR_MUST_PROVIDE_COURSE_INFO,
} from 'src/app/core/constants';
import { ICourse } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course-service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  allCourses: ICourse[] = [];

  allCourseTypes = COURSE_TYPE;
  currentCourseType = this.allCourseTypes[0].value;

  isShowAddCourseModal = false;
  newCourseForm: FormGroup;
  newCourseFormError = '';

  searchForm: FormGroup;
  searchDebounce = -1;
  suggestionFormSearch: ICourse[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCourseByType(this.currentCourseType);

    this.searchForm = this.fb.group({
      keyword: '',
    });

    this.newCourseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getCourseByType(courseType: string) {
    this.courseService
      .getCourseByType(courseType)
      .subscribe((res: any) => (this.allCourses = res.data.courses));
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

  onChangeCourseType(event: Event) {
    const target = event.target as HTMLSelectElement;

    this.currentCourseType = target.value;

    this.getCourseByType(this.currentCourseType);
  }

  onSearchInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    window.clearTimeout(this.searchDebounce);

    if (target.value === '') {
      this.suggestionFormSearch = [];
      return;
    }

    this.searchDebounce = window.setTimeout(() => {
      this.courseService
        .searchCourseByKeyword(target.value)
        .subscribe((res: any) => {
          this.suggestionFormSearch = res.data.courses;
        });
    }, 500);
  }

  goToCourseDetail(courseId: string) {
    this.router.navigateByUrl(`/course-detail/${courseId}`);
  }
}
