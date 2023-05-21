import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ALL_TEST_LEVELS,
  ERR_TEST_ANSWER_MUST_BE_FILLED,
  ERR_TEST_MUST_HAVE_CORRECT_ANSWER,
  ERR_TEST_MUST_HAVE_QUESTION,
  NEW_TEST_INIT_VALUE,
  NEW_TEST_MAX_ANSWER_QTY,
  TEST_ATTACHMENT_TYPE,
} from 'src/app/core/constants';
import {
  ESnackbarStatus,
  ETestAttachmentType,
  ETestLevel,
  INewTestAnswer,
} from 'src/app/core/models';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { RandomService } from 'src/app/core/services/random-service/random.service';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';
import { TestService } from 'src/app/core/services/test-service/test.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss'],
})
export class AddTestComponent implements OnInit {
  @ViewChild('figAudio', { static: false })
  public figAudio: ElementRef<HTMLAudioElement>; // audio tag reference
  newTest = NEW_TEST_INIT_VALUE;

  selectedAnswerId = '';

  newTestForm: FormGroup;

  allTestLevels = ALL_TEST_LEVELS;

  allTestAttachmentType = TEST_ATTACHMENT_TYPE;

  attachment: File | undefined = undefined;

  audioSrc = '';
  imageSrc = '';

  constructor(
    private fb: FormBuilder,
    private randomService: RandomService,
    private snackbarService: SnackbarService,
    private firebaseService: FirebaseService,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newTestForm = this.fb.group({
      level: this.allTestLevels[0].value,
      question: '',
      answer: '',
    });

    this.genInitAnswerForNewTest();
  }

  genAnswerBasedOnQty(qty: number) {
    const answers: INewTestAnswer[] = [];

    for (let i = 0; i < qty; ++i) {
      answers.push({
        answerId: this.randomService.generateRandomUUID(),
        content: '',
      });
    }

    return answers;
  }

  genInitAnswerForNewTest() {
    const answers = this.genAnswerBasedOnQty(NEW_TEST_MAX_ANSWER_QTY);

    this.newTest = {
      ...this.newTest,
      answers,
    };

    this.selectedAnswerId = this.newTest.answers[0].answerId;
  }

  onQuestionInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newTest = {
      ...this.newTest,
      question: target.value,
    };
  }

  onChangeNewTestAttachmentType(newType: ETestAttachmentType) {
    this.newTest = {
      ...this.newTest,
      attachmentType: newType,
      attachment: '',
    };

    this.audioSrc = '';
    this.imageSrc = '';
    this.attachment = undefined;
  }

  onChangeSelectedAnswer(event: Event) {
    const target = event.target as HTMLButtonElement;

    this.selectedAnswerId = target.value;

    const selectedAnswer = this.newTest.answers.find(
      (answer) => answer.answerId === target.value
    );

    const { level, question } = this.newTestForm.value;
    this.newTestForm.setValue({
      level,
      question,
      answer: selectedAnswer ? selectedAnswer.content : '',
    });
  }

  onChangeNewTestAnswerQty(newQty: number) {
    if (newQty > this.newTest.answers.length) {
      const newAnswers = this.genAnswerBasedOnQty(
        NEW_TEST_MAX_ANSWER_QTY - this.newTest.answers.length
      );

      this.newTest = {
        ...this.newTest,
        answers: [...this.newTest.answers, ...newAnswers],
      };
    } else {
      const newAnswers = this.newTest.answers.slice(0, newQty);
      let currentCorrectAnswer = this.newTest.correctAnswer;

      if (currentCorrectAnswer !== '') {
        const isCorrectAnswerStillAlive = newAnswers.find(
          (answer) => answer.answerId === currentCorrectAnswer
        );

        if (!isCorrectAnswerStillAlive) currentCorrectAnswer = '';
      }

      this.newTest = {
        ...this.newTest,
        answers: newAnswers,
        correctAnswer: currentCorrectAnswer,
      };
    }
  }

  onAnswerInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    const newAnswers = this.newTest.answers.map((answer) => {
      if (answer.answerId === this.selectedAnswerId) answer.content = value;

      return answer;
    });

    this.newTest = {
      ...this.newTest,
      answers: newAnswers,
    };
  }

  onMarkAsCorrectAnswerChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newTest = {
      ...this.newTest,
      correctAnswer: target.checked ? this.selectedAnswerId : '',
    };
  }

  onChangeAttachmentFile(event: Event) {
    const target = event.target as HTMLInputElement;

    const files = target.files;

    if (!files) return;

    if (this.newTest.attachmentType === ETestAttachmentType.IMAGE) {
      const reader = new FileReader();

      reader.onload = (e) => (this.imageSrc = reader.result as string);

      reader.readAsDataURL(files[0]);
    } else if (this.newTest.attachmentType === ETestAttachmentType.AUDIO) {
      this.audioSrc = URL.createObjectURL(files[0]);
    }

    this.attachment = files[0];
    this.newTest = {
      ...this.newTest,
      attachment: files[0].name,
    };
  }

  onChangeNewTestLevel(event: Event) {
    const target = event.target as HTMLSelectElement;

    this.newTest = {
      ...this.newTest,
      level: target.value as ETestLevel,
    };
  }

  onClearAttachment() {
    this.audioSrc = '';
    this.imageSrc = '';
  }

  existThisPage() {
    this.router.navigateByUrl('/tests?page=1');
  }

  isNewTestValid() {
    console.log(this.newTest);

    if (this.newTest.question === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        ERR_TEST_MUST_HAVE_QUESTION
      );
      return false;
    }

    if (this.newTest.correctAnswer === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        ERR_TEST_MUST_HAVE_CORRECT_ANSWER
      );
      return false;
    }

    for (let i = 0; i < this.newTest.answers.length; ++i) {
      if (this.newTest.answers[i].content === '') {
        this.snackbarService.showSnackbar(
          ESnackbarStatus.WARNING,
          ERR_TEST_ANSWER_MUST_BE_FILLED
        );
        return false;
      }
    }

    return true;
  }

  onSaveTest() {
    if (!this.isNewTestValid()) return;

    if (this.attachment) {
      this.firebaseService
        .pushFileToStorage(this.attachment)
        .subscribe((attachementUrl) => {
          this.newTest = {
            ...this.newTest,
            attachment: attachementUrl,
          };
          this.testService.addTest(this.newTest).subscribe(() => {
            this.existThisPage();
          });
        });
    } else {
      this.testService.addTest(this.newTest).subscribe(() => {
        this.existThisPage();
      });
    }
  }
}
