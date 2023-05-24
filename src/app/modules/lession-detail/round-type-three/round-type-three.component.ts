import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUND_TYPE_3_INIT_VALUE } from 'src/app/core/constants';
import { ESnackbarStatus, IRoundType3 } from 'src/app/core/models';
import { ArrayService } from 'src/app/core/services/array-service/array.service';
import { RoundService } from 'src/app/core/services/round-service/round.service';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-round-type-three',
  templateUrl: './round-type-three.component.html',
  styleUrls: ['./round-type-three.component.scss'],
})
export class RoundTypeThreeComponent implements OnInit {
  @Input() currentRound: IRoundType3;

  newRound = ROUND_TYPE_3_INIT_VALUE;
  flashWords = '';

  questionForm: FormGroup;

  answerForm: FormGroup;
  answerSplited: any = [];

  flashForm: FormGroup;
  flashWordsSplited: any = [];

  allWords: any = [];

  constructor(
    private roundService: RoundService,
    private fb: FormBuilder,
    private arrayService: ArrayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: '',
    });

    this.answerForm = this.fb.group({
      answer: '',
    });

    this.flashForm = this.fb.group({
      flash: '',
    });

    if (this.currentRound) {
      this.newRound = this.currentRound;

      const splitedCorrectAnswer = this.newRound.correctAns.split(' ');

      this.allWords = this.currentRound.randomWords.map((word) => {
        return {
          isRightAnswer: splitedCorrectAnswer.includes(word),
          word: word,
        };
      });
    }
  }

  onQuestionInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const words = target.value.trim();

    if (words.split(' ').length > 8) {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Câu hỏi chỉ được chứa tối đa 8 từ thôi'
      );

      this.questionForm.setValue({
        question: this.newRound.question,
      });
      return;
    }

    this.newRound = {
      ...this.newRound,
      question: words,
    };
  }

  onAnswerInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newRound = {
      ...this.newRound,
      correctAns: target.value.trim(),
    };

    const splitedWords = this.newRound.correctAns.split(' ');

    this.answerSplited = splitedWords.map((word) => {
      return {
        isRightAnswer: true,
        word,
      };
    });

    this.allWords = this.arrayService.shuffleArray([
      ...this.answerSplited,
      ...this.flashWordsSplited,
    ]);
  }

  onFlashWordInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const words = target.value.trim();

    if (words.split(' ').length > 3) {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Chỉ được phép nhập tối đa 3 từ gây nhiễu'
      );

      this.flashForm.setValue({
        flash: this.flashWords,
      });
      return;
    }

    this.flashWords = words;
    const splitedWords = this.flashWords.split(' ');

    this.flashWordsSplited = splitedWords.map((word) => {
      return {
        isRightAnswer: false,
        word,
      };
    });

    this.allWords = this.arrayService.shuffleArray([
      ...this.answerSplited,
      ...this.flashWordsSplited,
    ]);
  }

  isNewRoundValid(): boolean {
    if (this.newRound.question === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy điền câu hỏi của màn chơi này'
      );
      return false;
    }

    if (this.newRound.correctAns === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy cung cấp câu trả lời đúng của màn chơi này'
      );
      return false;
    }

    if (this.flashWordsSplited.length === 0) {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy cung cấp 3 từ gây nhiễu để màn chơi thú vị hơn'
      );
      return false;
    }

    return true;
  }

  getCourseIdAndLessionId() {
    return (this.activatedRoute.parent as ActivatedRoute).params;
  }

  onSaveRound() {
    if (!this.isNewRoundValid()) return;

    this.getCourseIdAndLessionId().subscribe((params: any) => {
      const { courseId, lessionId } = params;

      this.newRound = {
        ...this.newRound,
        randomWords: this.allWords.map((item: any) => item.word),
      };

      this.roundService
        .createNewRound(courseId, lessionId, this.newRound)
        .subscribe((res: any) => {
          this.router.navigate(['lession-detail', courseId, lessionId]);
        });
    });
  }
}
