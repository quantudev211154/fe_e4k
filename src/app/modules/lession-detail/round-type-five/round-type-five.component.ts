import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ROUND_TYPE_5_INIT_VALUE,
  ROUND_TYPE_5_MAX_CARDS,
  ROUND_TYPE_5_QUESTION_TYPE,
} from 'src/app/core/constants';
import {
  ESnackbarStatus,
  IRoundType5,
  IType5Card,
  IWord,
} from 'src/app/core/models';
import { RandomService } from 'src/app/core/services/random-service/random.service';
import { RoundService } from 'src/app/core/services/round-service/round.service';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-round-type-five',
  templateUrl: './round-type-five.component.html',
  styleUrls: ['./round-type-five.component.scss'],
})
export class RoundTypeFiveComponent implements OnInit {
  @Input() currentRound: IRoundType5;

  @ViewChild('audioElement', { static: false })
  public _audioRef: ElementRef<HTMLAudioElement>;

  newRound = ROUND_TYPE_5_INIT_VALUE;

  questionType = ROUND_TYPE_5_QUESTION_TYPE;
  currentQuestionType = this.questionType[0].value;

  selectedCard: IType5Card = this.newRound.cards[0];

  questionForm: FormGroup;
  suggestionFromQuestionSearch: IWord[] = [];
  selectedWordFromSearchQuestion: IWord | undefined = undefined;
  searchQuestionDebounce = -1;

  answerForm: FormGroup;
  suggestionFromAnswerSearch: IWord[] = [];
  selectedWordFromAnswer: IWord | undefined = undefined;
  searchAnswerDebounce = -1;

  cardIdAndPairList: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private randomService: RandomService,
    private fb: FormBuilder,
    private wordService: WordService,
    private snackbarService: SnackbarService,
    private roundService: RoundService
  ) {}

  ngOnInit(): void {
    this.genInitCardsForNewRound();

    this.questionForm = this.fb.group({
      question: '',
    });

    this.answerForm = this.fb.group({
      answer: '',
    });

    if (this.currentRound) {
      this.newRound = this.currentRound;
    }
  }

  genInitCardsForNewRound() {
    const cards: IType5Card[] = [];

    for (let i = 0; i < ROUND_TYPE_5_MAX_CARDS; ++i) {
      const card: IType5Card = {
        word: '',
        cardId: this.randomService.generateRandomUUID(),
      };

      cards.push(card);
    }

    this.newRound = {
      ...this.newRound,
      cards,
    };

    this.selectedCard = this.newRound.cards[0];
  }

  onChangeSelectedCard(card: IType5Card) {
    this.selectedCard = card;

    const existCardPair = this.cardIdAndPairList.find(
      (item: any) => item.cardId === this.selectedCard.cardId
    );

    if (!existCardPair) {
      this.selectedWordFromAnswer = undefined;
    } else {
      this.selectedWordFromAnswer = existCardPair.word;
    }
  }

  onChangeQuestionType(event: Event) {
    const target = event.target as HTMLSelectElement;

    this.currentQuestionType = parseInt(target.value);

    const cards = this.newRound.cards.map((card) => {
      const existCardPairId = this.cardIdAndPairList.find(
        (item: any) => item.cardId === card.cardId
      );

      if (existCardPairId) {
        if (this.currentQuestionType === this.questionType[0].value) {
          card.word = existCardPairId.word.vieVers[0];
        } else {
          card.word = existCardPairId.word.engVer;
        }
      }

      return card;
    });

    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  onQuestionInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const keyword = target.value.trim();

    window.clearTimeout(this.searchQuestionDebounce);

    if (keyword === '') {
      this.suggestionFromQuestionSearch = [];
      return;
    }

    this.searchQuestionDebounce = window.setTimeout(() => {
      this.wordService.searchWordByKeyword(keyword).subscribe((res: any) => {
        this.suggestionFromQuestionSearch = res.data.words;
      });
    }, 500);
  }

  onAnswerInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const keyword = target.value.trim();

    window.clearTimeout(this.searchAnswerDebounce);

    if (keyword === '') {
      this.suggestionFromAnswerSearch = [];
      return;
    }

    this.searchAnswerDebounce = window.setTimeout(() => {
      this.wordService.searchWordByKeyword(keyword).subscribe((res: any) => {
        this.suggestionFromAnswerSearch = res.data.words;
      });
    }, 500);
  }

  onChangeSelectedWordAnswerSearch(word: IWord) {
    this.selectedWordFromAnswer = word;

    this.suggestionFromAnswerSearch = [];
    this.answerForm.setValue({
      answer: '',
    });

    if (this.currentQuestionType === this.questionType[0].value) {
      this.selectedCard.word = word.vieVers[0];
    } else {
      this.selectedCard.word = word.engVer;
    }

    const existCardIdAndPair = this.cardIdAndPairList.find((item: any) => {
      item.cardId === this.selectedCard.cardId;
    });

    if (!existCardIdAndPair) {
      this.cardIdAndPairList.push({
        cardId: this.selectedCard.cardId,
        word: word,
      });
    } else {
      this.cardIdAndPairList = this.cardIdAndPairList.map((item: any) => {
        if (item.cardId === this.selectedCard.cardId) item.word = word;

        return item;
      });
    }
  }

  onChangeSelectedWordFromQuestionSearch(word: IWord) {
    this.selectedWordFromSearchQuestion = word;

    this.suggestionFromQuestionSearch = [];
    this.questionForm.setValue({
      question: '',
    });

    this.newRound = {
      ...this.newRound,
      question: word.audios[0],
    };
  }

  onChangeQuestionAudio(audio: string) {
    this.newRound = {
      ...this.newRound,
      question: audio,
    };

    this._audioRef.nativeElement.load();
  }

  onChangeWordForCard(vie: string) {
    const cards = this.newRound.cards.map((card) => {
      if (card.cardId === this.selectedCard.cardId) card.word = vie;

      return card;
    });

    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  onMarkAsCorrectAnsInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.newRound.correctAns = this.selectedCard.cardId;
    } else {
      this.newRound.correctAns = '';
    }
  }

  isNewRoundValid() {
    if (this.newRound.question === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy cung cấp đoạn audio làm câu hỏi'
      );
      return false;
    }

    for (let i = 0; i < this.newRound.cards.length; ++i) {
      const currentCard = this.newRound.cards[i];

      if (currentCard.word === '') {
        this.snackbarService.showSnackbar(
          ESnackbarStatus.WARNING,
          'Hãy cung cấp đầy đủ từ hiển thị ở từng ảnh'
        );
        return false;
      }
    }

    if (this.newRound.correctAns === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy đánh dấu câu trả lời đúng'
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

      this.roundService
        .createNewRound(courseId, lessionId, this.newRound)
        .subscribe((res: any) => {
          this.router.navigate(['lession-detail', courseId, lessionId]);
        });
    });
  }
}
