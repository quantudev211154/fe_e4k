import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ROUND_TYPE_2_INIT_VALUE,
  ROUND_TYPE_2_MAX_CARDS,
  ROUND_TYPE_2_QUESTION_TYPE,
} from 'src/app/core/constants';
import {
  ESnackbarStatus,
  IRoundType2,
  IType2Card,
  IWord,
} from 'src/app/core/models';
import { ArrayService } from 'src/app/core/services/array-service/array.service';
import { RandomService } from 'src/app/core/services/random-service/random.service';
import { RoundService } from 'src/app/core/services/round-service/round.service';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-round-type-two',
  templateUrl: './round-type-two.component.html',
  styleUrls: ['./round-type-two.component.scss'],
})
export class RoundTypeTwoComponent implements OnInit {
  newRound: IRoundType2 = ROUND_TYPE_2_INIT_VALUE;
  selectedCard: IType2Card | undefined = undefined;

  selectedWord: IWord | undefined = undefined;

  roundType2QuestionType = ROUND_TYPE_2_QUESTION_TYPE;
  currentQuestionType = this.roundType2QuestionType[0].value;
  searchDebounce = -1;
  searchForm: FormGroup;

  cardIdAndWordList: any = [];

  suggestionWordsFromSearch: IWord[] = [];

  constructor(
    private randomService: RandomService,
    private wordService: WordService,
    private fb: FormBuilder,
    private roundService: RoundService,
    private activatedRoute: ActivatedRoute,
    private arrayService: ArrayService,
    private router: Router,
    private snacbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.genInitCardsForNewRound();

    this.searchForm = this.fb.group({
      eng: '',
    });
  }

  genInitCardsForNewRound() {
    const cards: IType2Card[] = [];

    for (let i = 0; i < ROUND_TYPE_2_MAX_CARDS; ++i) {
      const card: IType2Card = {
        cardId: this.randomService.generateRandomUUID(),
        word: '',
        imageUrl: '',
      };

      cards.push(card);
    }

    this.newRound = {
      ...this.newRound,
      cards,
    };

    this.selectedCard = this.newRound.cards[0];
  }

  changeSelectedCard(card: IType2Card) {
    this.selectedCard = card;

    const existCard = this.cardIdAndWordList.find(
      (item: any) => item.cardId === card.cardId
    );

    this.selectedWord = existCard ? existCard.word : undefined;
  }

  isNewRoundIsValid() {
    if (this.newRound.question === '') {
      this.snacbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy điền câu hỏi của màn chơi'
      );
      return false;
    }

    if (this.newRound.correctAns === '') {
      this.snacbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy đánh dấu câu trả lời đúng của màn chơi này'
      );
      return false;
    }

    for (let i = 0; i < this.newRound.cards.length; ++i) {
      const currentCard = this.newRound.cards[i];

      if (currentCard.imageUrl === '' || currentCard.word === '') {
        this.snacbarService.showSnackbar(
          ESnackbarStatus.WARNING,
          'Hãy bổ sung đầy đủ hình minh hoạ và từ cho mỗi ảnh'
        );
        return false;
      }
    }

    return true;
  }

  onChangeQuestionType(event: Event) {
    const target = event.target as HTMLInputElement;

    this.currentQuestionType = parseInt(target.value);

    const cards = this.newRound.cards.map((card: any) => {
      const cardInCardIdAndWordList = this.cardIdAndWordList.find(
        (item: any) => item.cardId === card.cardId
      );

      if (cardInCardIdAndWordList) {
        if (this.currentQuestionType === this.roundType2QuestionType[0].value) {
          card.word = cardInCardIdAndWordList.word.vieVers[0];
        } else {
          card.word = cardInCardIdAndWordList.word.engVer;
        }
      }

      return card;
    });

    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  onQuestionChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newRound = {
      ...this.newRound,
      question: target.value.trim(),
    };
  }

  onCardWordChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.value === '') {
      this.suggestionWordsFromSearch = [];
      return;
    }

    window.clearTimeout(this.searchDebounce);

    this.searchDebounce = window.setTimeout(() => {
      this.wordService
        .searchWordByKeyword(target.value)
        .subscribe((res: any) => {
          this.suggestionWordsFromSearch = res.data.words;
        });
    }, 500);
  }

  updateContentForCurrentCard(word: string, imageUrl: string) {
    const cards = this.newRound.cards.map((card) => {
      if (card.cardId === this.selectedCard?.cardId) {
        card.word = word;
        card.imageUrl = imageUrl;
      }

      return card;
    });

    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  changeSelectedWord(word: IWord) {
    const existWord = this.cardIdAndWordList.find((item: any) => {
      item.cardId === this.selectedCard?.cardId;
    });

    if (!existWord) {
      this.cardIdAndWordList.push({ cardId: this.selectedCard?.cardId, word });
      this.selectedWord = word;
    } else {
      this.cardIdAndWordList = this.cardIdAndWordList.map((item: any) => {
        if (item.cardId === this.selectedCard?.cardId) item.word = word;
      });
      this.selectedWord = existWord.word;
    }

    if (this.currentQuestionType === this.roundType2QuestionType[0].value) {
      this.updateContentForCurrentCard(word.vieVers[0], word.images[0]);
    } else {
      this.updateContentForCurrentCard(word.engVer, word.images[0]);
    }

    this.searchForm.setValue({
      eng: '',
    });
    this.suggestionWordsFromSearch = [];
  }

  onChangeCardWord(vie: string) {
    const cards = this.newRound.cards.map((card) => {
      if (card.cardId === this.selectedCard?.cardId) {
        card.word = vie;
      }

      return card;
    });

    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  onMarkAsCorrectAnsCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newRound = {
      ...this.newRound,
      correctAns: target.checked ? (this.selectedCard?.cardId as string) : '',
    };
  }

  onChangeCardImage(imageUrl: string) {
    const cards = this.newRound.cards.map((card) => {
      if (card.cardId === this.selectedCard?.cardId) {
        card.imageUrl = imageUrl;
      }

      return card;
    });

    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  getCourseIdAndLessionId() {
    return (this.activatedRoute.parent as ActivatedRoute).params;
  }

  onSaveRound() {
    if (!this.isNewRoundIsValid()) return;

    this.getCourseIdAndLessionId().subscribe((params: any) => {
      const { courseId, lessionId } = params;

      this.newRound = {
        ...this.newRound,
        cards: this.arrayService.shuffleArray(this.newRound.cards),
      };

      this.roundService
        .createNewRound(courseId, lessionId, this.newRound)
        .subscribe((res: any) => {
          this.router.navigate(['lession-detail', courseId, lessionId]);
        });
    });
  }
}
