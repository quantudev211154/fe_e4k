import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  COURSE_TYPES,
  ERR_MUST_PROVIDE_LESSION_INFO,
} from 'src/app/core/constants';
import { ECLRStatus, ICourse } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course-service/course.service';
import { LessionService } from 'src/app/core/services/lession-service/lession.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  currentCourse: ICourse;

  isShowEditCourseModal = false;

  editCourseForm: FormGroup;
  editingCourse: ICourse;

  allCourseType = COURSE_TYPES;

  isShowAddLessionModal = false;
  newLessionForm: FormGroup;
  newLessionFormError = '';

  constructor(
    private courseService: CourseService,
    private lessionService: LessionService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const courseId = this.activateRoute.snapshot.paramMap.get('courseId');

    if (!courseId) {
      console.log('Rs: No Course Id - Course detail page');

      this.router.navigateByUrl('/');
      return;
    }

    this.courseService.getCourseById(courseId).subscribe((res: any) => {
      this.currentCourse = res.data.course;
      this.editingCourse = res.data.course;

      this.newLessionForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });

      this.editCourseForm = this.fb.group({
        title: [this.editingCourse?.title, Validators.required],
        description: [this.editingCourse?.description, Validators.required],
      });
    });
  }

  resetNewLessionForm() {
    this.newLessionForm.reset();
  }

  showAddLessionModal() {
    this.isShowAddLessionModal = true;
  }

  hideAddLessionModal() {
    this.resetNewLessionForm();

    this.isShowAddLessionModal = false;
  }

  setNewCourseErrorMessage(message: string) {
    this.newLessionFormError = message;

    const messageTimeoutId = window.setTimeout(() => {
      this.newLessionFormError = '';
      window.clearTimeout(messageTimeoutId);
    }, 3000);
  }

  onNewLessionFormSubmit() {
    const { title, description } = this.newLessionForm.value;

    if (title === '' || description === '')
      return this.setNewCourseErrorMessage(ERR_MUST_PROVIDE_LESSION_INFO);

    const courseId = this.activateRoute.snapshot.paramMap.get('courseId');

    if (!courseId) {
      console.log('Rs: No Course Id - Course detail page 98');

      this.router.navigateByUrl('/');
      return;
    }

    this.lessionService
      .createNewLession(title, description, courseId)
      .subscribe((res: any) => {
        const { updatedCourse, latestLession } = res.data;

        this.currentCourse = updatedCourse;

        this.router.navigate([
          'lession-detail',
          updatedCourse._id,
          latestLession._id,
        ]);

        this.hideAddLessionModal();
      });
  }

  goToLessionDetail(selectedLessionId: string) {
    const courseId = this.activateRoute.snapshot.paramMap.get('courseId');

    if (!courseId) {
      console.log('Rs: No Course Id - Course detail page - 124');

      this.router.navigateByUrl('/');
      return;
    }

    this.router.navigate(['lession-detail', courseId, selectedLessionId]);
  }

  hideEditCourseModal() {
    this.isShowEditCourseModal = false;
  }

  showEditCourseModal() {
    this.isShowEditCourseModal = true;
  }

  onChangeEditingCourseType(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as ECLRStatus;

    if (this.editingCourse) {
      this.editingCourse = {
        ...this.editingCourse,
        type: value,
      };
    }
  }

  onEditCourseSubmit() {
    const { title, description } = this.editCourseForm.value;

    if (this.editingCourse) {
      this.editingCourse = {
        ...this.editingCourse,
        title,
        description,
      };

      this.courseService
        .updateCourse(this.editingCourse)
        .subscribe((res: any) => {
          this.currentCourse = res.data.editedCourse;

          this.hideEditCourseModal();
        });
    }
  }
}
