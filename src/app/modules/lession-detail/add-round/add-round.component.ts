import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PLAY_TYPE_1_TOTAL_PAIRS,
  ROUND_TYPES_INFO,
  ROUND_TYPE_1_INIT_VALUE,
  ROUND_TYPE_2_INIT_VALUE,
  ROUND_TYPE_2_QUESTION_TYPE,
  ROUND_TYPE_3_INIT_VALUE,
  ROUND_TYPE_4_INIT_VALUE,
  ROUND_TYPE_5_INIT_VALUE,
  ROUND_TYPE_6_INIT_VALUE,
} from 'src/app/core/constants';
import { IType1Card, IType2Card, IWord } from 'src/app/core/models';
import { ArrayService } from 'src/app/core/services/array-service/array.service';
import { RandomService } from 'src/app/core/services/random-service/random.service';
import { RoundService } from 'src/app/core/services/round-service/round.service';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-add-round',
  templateUrl: './add-round.component.html',
  styleUrls: ['./add-round.component.scss'],
})
export class AddRoundComponent implements OnInit {
  currentPlayType = ROUND_TYPE_1_INIT_VALUE.playType;
  newRound: any;

  newRoundType1 = ROUND_TYPE_1_INIT_VALUE;
  newRoundType1Form: FormGroup;
  newRoundType1SearchDebounce = -1;
  newRoundType1SuggestWords: IWord[] = [];
  newRoundType1SelectedWord: IWord | undefined = undefined;
  newRoundType1TmpCardsInfo: any = undefined;
  newRoundType1ListSelectedWords: IWord[] = [];

  newRoundType2 = ROUND_TYPE_2_INIT_VALUE;
  newRoundType2QuestionTypes = ROUND_TYPE_2_QUESTION_TYPE;
  newRoundType2SelectedQuestionType = ROUND_TYPE_2_QUESTION_TYPE[0].value;
  newRoundType2SelectedCard: IType2Card | undefined = undefined;
  newRoundType2CardForm: FormGroup;
  newRoundType2SearchDebounce = -1;
  newRoundType2SuggestWords: IWord[] = [];
  newRoundType2SelectedWord: IWord | undefined = undefined;
  newRoundType2TmpCardsInfo: any = undefined;

  newRoundType3 = ROUND_TYPE_3_INIT_VALUE;
  newRoundType4 = ROUND_TYPE_4_INIT_VALUE;
  newRoundType5 = ROUND_TYPE_5_INIT_VALUE;
  newRoundType6 = ROUND_TYPE_6_INIT_VALUE;

  roundTypeInfo = ROUND_TYPES_INFO;

  roundType1TotalPairs = PLAY_TYPE_1_TOTAL_PAIRS;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private wordService: WordService,
    private randomService: RandomService,
    private roundService: RoundService,
    private activatedRoute: ActivatedRoute,
    private arrayService: ArrayService
  ) {}

  ngOnInit(): void {
    this.newRoundType1Form = this.fb.group({
      engWord: '',
    });

    this.newRoundType2CardForm = this.fb.group({
      type2EngWord: '',
    });
  }

  onPlayTypeSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedType = parseInt(target.value);

    this.currentPlayType = selectedType;

    this.changeValueForNewRoundTypeBasedOnSelectedType(selectedType);
  }

  getCourseIdAndLessionId() {
    return (this.activatedRoute.parent as ActivatedRoute).params;
  }

  changeValueForNewRoundTypeBasedOnSelectedType(selectedType: number) {
    if (selectedType === ROUND_TYPES_INFO[0].value) {
      this.newRoundType1 = ROUND_TYPE_1_INIT_VALUE;
      this.newRound = this.newRoundType1;
    } else if (selectedType === ROUND_TYPES_INFO[1].value) {
      this.newRoundType2 = this.initValueForNewRoundType2();
      this.newRound = this.newRoundType2;
    } else if (selectedType === ROUND_TYPES_INFO[2].value) {
      this.newRoundType3 = ROUND_TYPE_3_INIT_VALUE;
      this.newRound = this.newRoundType3;
    } else if (selectedType === ROUND_TYPES_INFO[3].value) {
      this.newRoundType4 = ROUND_TYPE_4_INIT_VALUE;
      this.newRound = this.newRoundType4;
    } else if (selectedType === ROUND_TYPES_INFO[4].value) {
      this.newRoundType5 = ROUND_TYPE_5_INIT_VALUE;
      this.newRound = this.newRoundType5;
    } else if (selectedType === ROUND_TYPES_INFO[5].value) {
      this.newRoundType6 = ROUND_TYPE_6_INIT_VALUE;
      this.newRound = this.newRoundType6;
    }
  }

  setTotalPairForRoundType1(pair: number) {
    this.newRoundType1.totalPairs = pair;
    this.newRound = this.newRoundType1;
  }

  onPlayType1FormInput(event: Event) {
    const target = event.target as HTMLInputElement;

    window.clearTimeout(this.newRoundType1SearchDebounce);

    if (target.value === '') {
      this.newRoundType1SelectedWord = undefined;
      this.newRoundType1SuggestWords = [];
      return;
    }

    this.newRoundType1SearchDebounce = window.setTimeout(() => {
      this.wordService
        .searchWordByKeyword(target.value)
        .subscribe((res: any) => {
          this.newRoundType1SuggestWords = res.data.words;
        });
    }, 500);
  }

  setSelectedWordForNewRound1(word: IWord) {
    this.newRoundType1SelectedWord = word;
    this.newRoundType1SuggestWords = [];
    this.newRoundType1Form.setValue({
      engWord: '',
    });

    this.newRoundType1TmpCardsInfo = {
      ...this.newRoundType1TmpCardsInfo,
      vieVer: word.vieVers[0],
      image: word.images[0],
    };
  }

  addCardPair() {
    if (!this.newRoundType1SelectedWord) return;

    const cardPairId = this.randomService.generateRandomUUID();

    const card1: IType1Card = {
      cardId: this.randomService.generateRandomUUID(),
      pairId: cardPairId,
      imageUrl: this.newRoundType1TmpCardsInfo.image,
      word: this.newRoundType1SelectedWord.engVer,
    };

    const card2: IType1Card = {
      cardId: this.randomService.generateRandomUUID(),
      pairId: cardPairId,
      imageUrl: this.newRoundType1TmpCardsInfo.image,
      word: this.newRoundType1TmpCardsInfo.vieVer,
    };

    this.newRoundType1 = {
      ...this.newRoundType1,
      cards: [...this.newRoundType1.cards, card1, card2],
    };

    console.log(this.newRoundType1);

    this.newRound = this.newRoundType1;

    this.newRoundType1ListSelectedWords.push(this.newRoundType1SelectedWord);

    this.newRoundType1SelectedWord = undefined;
    this.newRoundType1TmpCardsInfo = undefined;
  }

  onSaveRound() {
    this.getCourseIdAndLessionId().subscribe((params) => {
      const { courseId, lessionId } = params;

      this.newRound = {
        ...this.newRound,
        cards: this.arrayService.shuffleArray(this.newRound.cards),
      };

      console.log(this.newRound);

      this.roundService
        .createNewRound(courseId, lessionId, this.newRound)
        .subscribe((res: any) => {
          this.router.navigate(['lession-detail', courseId, lessionId]);
        });
    });
  }

  isShowSaveRoundBtn() {
    if (this.currentPlayType === ROUND_TYPE_1_INIT_VALUE.playType) {
      if (this.newRoundType1.cards.length === this.newRoundType1.totalPairs * 2)
        return true;
    }
    if (this.currentPlayType === ROUND_TYPE_2_INIT_VALUE.playType) {
      return true;
    }

    return false;
  }

  initValueForNewRoundType2() {
    const cards: IType2Card[] = [];

    for (let i = 0; i < 4; ++i) {
      const card: IType2Card = {
        cardId: this.randomService.generateRandomUUID(),
        imageUrl: '',
        word: '',
      };

      cards.push(card);
    }

    return {
      ...this.newRoundType2,
      cards,
    };
  }

  setSelectedNewRoundType2Card(card: IType2Card | undefined) {
    this.newRoundType2SelectedCard = card;
  }

  onRoundType2QuestionInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newRoundType2 = {
      ...this.newRoundType2,
      question: target.value,
    };
  }

  onPlayType2FormInput(event: Event) {
    const target = event.target as HTMLInputElement;

    window.clearTimeout(this.newRoundType2SearchDebounce);

    if (target.value === '') {
      this.newRoundType2SelectedWord = undefined;
      this.newRoundType2SuggestWords = [];
      return;
    }

    this.newRoundType2SearchDebounce = window.setTimeout(() => {
      this.wordService
        .searchWordByKeyword(target.value)
        .subscribe((res: any) => {
          this.newRoundType2SuggestWords = res.data.words;
        });
    }, 500);
  }

  onUpdateType2Card() {
    const newCards = [];

    if (this.newRoundType2SelectedCard && this.newRoundType2TmpCardsInfo) {
      for (let i = 0; i < this.newRoundType2.cards.length; ++i) {
        let currentCard = this.newRoundType2.cards[i];

        if (currentCard.cardId === this.newRoundType2SelectedCard.cardId)
          currentCard = {
            ...currentCard,
            imageUrl: this.newRoundType2TmpCardsInfo.image,
            word: this.newRoundType2TmpCardsInfo.word,
          };

        newCards.push(currentCard);
      }
    }

    this.newRoundType2 = {
      ...this.newRoundType2,
      cards: newCards,
    };

    this.newRoundType2SelectedCard = undefined;
    this.newRoundType2TmpCardsInfo = undefined;
  }

  setSelectedWordForNewRound2(word: IWord) {
    this.newRoundType2SelectedWord = word;
    this.newRoundType2SuggestWords = [];
    this.newRoundType2CardForm.setValue({
      type2EngWord: '',
    });

    this.newRoundType2TmpCardsInfo = {
      ...this.newRoundType2TmpCardsInfo,
      word:
        this.newRoundType2SelectedQuestionType ===
        ROUND_TYPE_2_QUESTION_TYPE[0].value
          ? word.vieVers[0]
          : word.engVer,
      image: word.images[0],
    };
  }

  onType2QuestionSelectChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newRoundType2SelectedQuestionType = parseInt(target.value);
  }
}
