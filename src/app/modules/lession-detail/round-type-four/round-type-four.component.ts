import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUND_TYPE_4_INIT_VALUE } from 'src/app/core/constants';
import { ESnackbarStatus, IRoundType4 } from 'src/app/core/models';
import { RoundService } from 'src/app/core/services/round-service/round.service';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-round-type-four',
  templateUrl: './round-type-four.component.html',
  styleUrls: ['./round-type-four.component.scss'],
})
export class RoundTypeFourComponent implements OnInit {
  @Input() currentRound: IRoundType4;

  newRound = ROUND_TYPE_4_INIT_VALUE;

  correctAnsSplited: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private roundService: RoundService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    if (this.currentRound) {
      this.newRound = this.currentRound;

      this.correctAnsSplited = this.currentRound.correctAns.split(' ');
    }
  }

  isNewRoundValid() {
    if (this.newRound.question === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Đừng để trống câu hỏi'
      );
      return false;
    }

    if (this.newRound.correctAns === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy cung cấp câu trả lời đúng'
      );
      return false;
    }

    const questionSplited = this.newRound.question.trim().split(' ');

    const emptyPos = questionSplited.find((word) => word === '...');

    if (!emptyPos) {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        "Hãy đánh dấu vị trí của từ cần điền bằng dấu '...'"
      );
      return false;
    }

    const questionEmptySlotQty = this.newRound.question
      .split(' ')
      .filter((word) => word === '...').length;
    const answerWordsQty = this.newRound.correctAns.split(' ').length;

    if (
      questionEmptySlotQty > answerWordsQty ||
      questionEmptySlotQty < answerWordsQty
    ) {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        `Số lượng chỗ trống trên câu hỏi không khớp với số từ phải điền bên dưới`
      );
      return false;
    }

    return true;
  }

  onQuestionInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newRound.question = target.value.trim();
  }

  onAnswerInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newRound.correctAns = target.value.trim();

    if (this.newRound.correctAns !== '')
      this.correctAnsSplited = this.newRound.correctAns.split(' ');
    else this.correctAnsSplited = [];
  }

  getCourseIdAndLessionId() {
    return (this.activatedRoute.parent as ActivatedRoute).params;
  }

  onSaveRound() {
    if (!this.isNewRoundValid()) return;

    this.getCourseIdAndLessionId().subscribe((params: any) => {
      const { courseId, lessionId } = params;

      this.roundService
        .createNewRound(courseId, lessionId, this.newRound)
        .subscribe((res: any) => {
          this.router.navigate(['lession-detail', courseId, lessionId]);
        });
    });
  }
}
