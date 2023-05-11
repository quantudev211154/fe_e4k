import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ROUND_TYPE_6_BASED_CARDS_PAIR,
  ROUND_TYPE_6_INIT_VALUE,
  ROUND_TYPE_6_QUESTIONS_TYPE,
} from 'src/app/core/constants';
import { ESnackbarStatus, IType6Card, IWord } from 'src/app/core/models';
import { ArrayService } from 'src/app/core/services/array-service/array.service';
import { RandomService } from 'src/app/core/services/random-service/random.service';
import { RoundService } from 'src/app/core/services/round-service/round.service';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-round-type-six',
  templateUrl: './round-type-six.component.html',
  styleUrls: ['./round-type-six.component.scss'],
})
export class RoundTypeSixComponent implements OnInit {
  newRound = ROUND_TYPE_6_INIT_VALUE;

  selectedQuestionType = ROUND_TYPE_6_QUESTIONS_TYPE[0].value;
  questionType = ROUND_TYPE_6_QUESTIONS_TYPE;

  selectedCardPairId: string | undefined = undefined;

  currentCardPair = ROUND_TYPE_6_BASED_CARDS_PAIR;

  searchForm: FormGroup;
  suggestionFromSearch: IWord[] = [];
  searchDebounce = -1;

  cardPairIdAndWordList: any = [];
  selectedWord: IWord | undefined = undefined;
  selectedWordDetail: any = undefined;

  constructor(
    private snackbarService: SnackbarService,
    private arrayService: ArrayService,
    private randomService: RandomService,
    private fb: FormBuilder,
    private wordService: WordService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private roundService: RoundService
  ) {}

  ngOnInit(): void {
    const cards = this.genCardsBasedOnCardsPairsQty(this.currentCardPair);

    this.selectedCardPairId = cards[0].pairId;

    this.newRound = {
      ...this.newRound,
      cards,
    };

    this.searchForm = this.fb.group({
      eng: '',
    });
  }

  genCardsBasedOnCardsPairsQty(qty: number) {
    const cards: IType6Card[] = [];

    let pairId = this.randomService.generateRandomUUID();

    for (let i = 0; i < qty * 2; ++i) {
      const card: IType6Card = {
        cardId: this.randomService.generateRandomUUID(),
        isAudio: false,
        answer: '',
        pairId,
      };

      cards.push(card);

      if ((i + 1) % 2 === 0) pairId = this.randomService.generateRandomUUID();
    }

    return cards;
  }

  onQuestionTypeSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    this.selectedQuestionType = parseInt(value);

    const cards = [];

    for (let i = 0; i < this.newRound.cards.length; ++i) {
      const currentCard = this.newRound.cards[i];

      const existWord = this.cardPairIdAndWordList.find(
        (item: any) => item.pairId === currentCard.pairId
      );

      if (existWord) {
        if (
          i < this.newRound.cards.length - 1 &&
          this.newRound.cards[i + 1].pairId === currentCard.pairId
        ) {
          if (this.selectedQuestionType === this.questionType[0].value) {
            this.newRound.cards[i + 1].answer = existWord.word.vieVers[0];
          } else {
            this.newRound.cards[i + 1].answer = existWord.word.engVer;
          }
        }
      }

      cards.push(currentCard);
    }

    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  onChangeSelectedCardPair(pairId: string) {
    this.selectedCardPairId = pairId;

    const existWord = this.cardPairIdAndWordList.find(
      (item: any) => item.pairId === this.selectedCardPairId
    );

    this.selectedWord = existWord ? existWord.word : undefined;

    for (let i = 0; i < this.newRound.cards.length; ++i) {
      const currentCard = this.newRound.cards[i];

      if (currentCard.pairId === this.selectedCardPairId) {
        this.selectedWordDetail = {
          ...this.selectedWordDetail,
          vie: this.newRound.cards[i + 1].answer,
          audio: currentCard.answer,
        };
        break;
      }
    }
  }

  onChangeCardPairQty(newCardPairQty: number) {
    if (newCardPairQty > this.currentCardPair) {
      const cards = this.genCardsBasedOnCardsPairsQty(
        newCardPairQty - this.currentCardPair
      );

      this.newRound = {
        ...this.newRound,
        cards: [...this.newRound.cards, ...cards],
      };
    } else if (newCardPairQty < this.currentCardPair) {
      this.newRound = {
        ...this.newRound,
        cards: this.newRound.cards.slice(0, newCardPairQty * 2),
      };
    }

    this.currentCardPair = newCardPairQty;
  }

  onSearchInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    window.clearTimeout(this.searchDebounce);

    if (value === '') {
      this.suggestionFromSearch = [];
      return;
    }

    this.searchDebounce = window.setTimeout(() => {
      this.wordService.searchWordByKeyword(value).subscribe((res: any) => {
        this.suggestionFromSearch = res.data.words;
      });
    }, 500);
  }

  onClickOnSearchSuggestionItem(word: IWord) {
    this.selectedWord = word;

    const existCardPair = this.cardPairIdAndWordList.find(
      (item: any) => item.pairId === this.selectedCardPairId
    );

    if (!existCardPair) {
      this.cardPairIdAndWordList.push({
        pairId: this.selectedCardPairId,
        word,
      });
    } else {
      this.cardPairIdAndWordList = this.cardPairIdAndWordList.map(
        (item: any) => {
          if (item.pairId === this.selectedCardPairId)
            item = {
              ...item,
              word,
            };

          return item;
        }
      );
    }

    const cards = this.newRound.cards;

    for (let i = 0; i < cards.length; ++i) {
      const currentCard = cards[i];

      if (currentCard.pairId === this.selectedCardPairId) {
        if (this.selectedQuestionType === this.questionType[0].value) {
          currentCard.answer = word.audios[0];
          currentCard.isAudio = true;
          cards[i + 1].answer = word.vieVers[0];
        } else if (this.selectedQuestionType === this.questionType[1].value) {
          currentCard.answer = word.audios[0];
          currentCard.isAudio = true;
          cards[i + 1].answer = word.engVer;
        }

        break;
      }
    }

    this.newRound = {
      ...this.newRound,
      cards,
    };

    for (let i = 0; i < this.newRound.cards.length; ++i) {
      const currentCard = this.newRound.cards[i];

      if (currentCard.pairId === this.selectedCardPairId) {
        this.selectedWordDetail = {
          ...this.selectedWordDetail,
          vie: word.vieVers[0],
          audio: word.audios[0],
        };
        break;
      }
    }

    this.suggestionFromSearch = [];
    this.searchForm.setValue({
      eng: '',
    });
  }

  onChangeCardVieWord(newVie: string) {
    const cards = this.newRound.cards;

    for (let i = 0; i < cards.length; ++i) {
      const currentCard = cards[i];

      if (currentCard.pairId === this.selectedCardPairId) {
        cards[i + 1].answer = newVie;

        break;
      }
    }

    this.selectedWordDetail = {
      ...this.selectedWordDetail,
      vie: newVie,
    };
    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  onChangeCardAudio(newAudio: string) {
    const cards = this.newRound.cards;

    for (let i = 0; i < cards.length; ++i) {
      const currentCard = cards[i];

      if (currentCard.pairId === this.selectedCardPairId) {
        cards[i].answer = newAudio;
        cards[i].isAudio = true;

        break;
      }
    }

    this.selectedWordDetail = {
      ...this.selectedWordDetail,
      audio: newAudio,
    };
    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  isNewRoundValid() {
    for (let i = 0; i < this.newRound.cards.length; ++i) {
      const currentCard = this.newRound.cards[i];

      if (currentCard.answer === '') {
        this.snackbarService.showSnackbar(
          ESnackbarStatus.WARNING,
          'Hãy cung cấp đầy đủ thông tin cho mỗi ảnh'
        );
        return false;
      }
    }

    return true;
  }

  shuffleCardsByPosition() {
    const oddPos: IType6Card[] = this.arrayService.shuffleArray(
      this.newRound.cards.filter((card, index) => index % 2 === 0)
    );
    const evenPos: IType6Card[] = this.arrayService.shuffleArray(
      this.newRound.cards.filter((card, index) => index % 2 !== 0)
    );
    const newCards: IType6Card[] = [];

    for (let i = 0; i < this.newRound.cards.length / 2; ++i) {
      newCards.push(oddPos[i]);
      newCards.push(evenPos[i]);
    }

    return newCards;
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
        cards: this.shuffleCardsByPosition(),
        totalPairs: this.currentCardPair,
      };

      this.roundService
        .createNewRound(courseId, lessionId, this.newRound)
        .subscribe((res: any) => {
          this.router.navigate(['lession-detail', courseId, lessionId]);
        });
    });
  }
}
