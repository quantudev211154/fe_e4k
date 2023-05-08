import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUND_TYPE_1_INIT_VALUE } from 'src/app/core/constants';
import { ESnackbarStatus, IType1Card, IWord } from 'src/app/core/models';
import { RandomService } from 'src/app/core/services/random-service/random.service';
import { WordService } from 'src/app/core/services/word-service/word.service';
import { map } from 'rxjs';
import { ArrayService } from 'src/app/core/services/array-service/array.service';
import { RoundService } from 'src/app/core/services/round-service/round.service';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-round-type-one',
  templateUrl: './round-type-one.component.html',
  styleUrls: ['./round-type-one.component.scss'],
})
export class RoundTypeOneComponent implements OnInit {
  newRound = ROUND_TYPE_1_INIT_VALUE;
  selectedPairId: string | undefined = undefined;
  cardPairsAndWordList: any = [];

  searchDebounce = -1;
  searchForm: FormGroup;
  searchSuggestionList: IWord[] = [];

  selectedWord: IWord | undefined = undefined;
  selectedWordDetail: any = undefined;

  constructor(
    private router: Router,
    private randomService: RandomService,
    private fb: FormBuilder,
    private wordService: WordService,
    private activatedRoute: ActivatedRoute,
    private arrayService: ArrayService,
    private roundService: RoundService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.genInitCardsBasedOnTotalPairs();

    this.searchForm = this.fb.group({
      keyword: '',
    });
  }

  genInitCardsBasedOnTotalPairs() {
    const cardsQty = this.newRound.totalPairs * 2;

    const cards = this.genCardsListByQty(cardsQty);

    this.selectedPairId = cards[0].pairId;

    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  genCardsListByQty(cardsQty: number) {
    const cards: IType1Card[] = [];
    let cardPairId = this.randomService.generateRandomUUID();

    for (let i = 0; i < cardsQty; ++i) {
      const card: IType1Card = {
        cardId: this.randomService.generateRandomUUID(),
        pairId: cardPairId,
        imageUrl: '',
        word: '',
      };

      cards.push(card);

      if ((i + 1) % 2 === 0)
        cardPairId = this.randomService.generateRandomUUID();
    }

    return cards;
  }

  isNewRoundValid(): boolean {
    for (let i = 0; i < this.newRound.cards.length; ++i) {
      const currentCard = this.newRound.cards[i];

      if (currentCard.imageUrl === '') {
        this.snackbarService.showSnackbar(
          ESnackbarStatus.WARNING,
          'Hãy bổ sung hình minh hoạ cho các ảnh'
        );
        return false;
      }

      if (currentCard.word === '') {
        this.snackbarService.showSnackbar(
          ESnackbarStatus.WARNING,
          'Hãy bổ sung đầy đủ từ cho các ảnh'
        );
        return false;
      }
    }

    return true;
  }

  changeSelectedPairId(pairId: string) {
    this.selectedPairId = pairId;

    const result = this.cardPairsAndWordList.find(
      (item: any) => item.pairId === pairId
    );

    if (!result) {
      this.selectedWord = undefined;
      this.selectedWordDetail = undefined;
      return;
    }

    this.selectedWord = result.word;

    for (let i = 0; i < this.newRound.cards.length; ++i) {
      const currentCard = this.newRound.cards[i];

      if (currentCard.pairId === pairId) {
        this.selectedWordDetail = {
          ...this.selectedWordDetail,
          imageUrl: currentCard.imageUrl,
          eng: currentCard.word,
          vie: this.newRound.cards[i + 1].word,
        };

        break;
      }
    }
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;

    window.clearTimeout(this.searchDebounce);

    if (target.value === '') return;

    this.searchDebounce = window.setTimeout(() => {
      this.wordService
        .searchWordByKeyword(target.value)
        .subscribe((res: any) => {
          this.searchSuggestionList = res.data.words;
        });
    }, 500);
  }

  onChangeRoundTotalPairs(pairs: number) {
    const newCardsQty = pairs * 2;
    const currentRoundCardsQty = this.newRound.cards.length;

    if (newCardsQty < currentRoundCardsQty) {
      this.newRound = {
        ...this.newRound,
        cards: this.newRound.cards.slice(0, newCardsQty),
        totalPairs: pairs,
      };
    } else {
      const cards = this.genCardsListByQty(newCardsQty - currentRoundCardsQty);

      this.newRound = {
        ...this.newRound,
        cards: [...this.newRound.cards, ...cards],
        totalPairs: pairs,
      };
    }
  }

  addWordToCardPairsAndWordList(word: IWord) {
    const duplicateWord = this.cardPairsAndWordList.find(
      (item: any) => item.pairId === this.selectedPairId
    );

    if (!duplicateWord) {
      this.cardPairsAndWordList.push({
        pairId: this.selectedPairId,
        word,
      });

      return;
    }

    this.cardPairsAndWordList = this.cardPairsAndWordList.map((item: any) => {
      if (item.pairId === this.selectedPairId) item.word = word;

      return item;
    });
  }

  setSelectedWordFromSearch(word: IWord) {
    this.selectedWordDetail = {
      ...this.selectedWordDetail,
      imageUrl: word.images[0],
      eng: word.engVer,
      vie: word.vieVers[0],
    };

    const newCards = this.newRound.cards;

    for (let i = 0; i < newCards.length; ++i) {
      const currentCard = newCards[i];

      if (currentCard.pairId === this.selectedPairId) {
        currentCard.imageUrl = word.images[0];
        currentCard.word = word.engVer;

        newCards[i + 1].imageUrl = word.images[0];
        newCards[i + 1].word = word.vieVers[0];

        break;
      }
    }

    this.newRound = {
      ...this.newRound,
      cards: newCards,
    };

    this.addWordToCardPairsAndWordList(word);

    this.selectedWord = word;
    this.searchForm.setValue({
      keyword: '',
    });
    this.searchSuggestionList = [];
  }

  onChangeCardVieWord(newVie: string) {
    const cards = this.newRound.cards;

    for (let i = 0; i < cards.length; ++i) {
      const currentCard = cards[i];

      if (currentCard.pairId === this.selectedPairId) {
        cards[i + 1].word = newVie;

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

  onChangeCardImage(newImage: string) {
    const cards = this.newRound.cards;

    for (let i = 0; i < cards.length; ++i) {
      const currentCard = cards[i];

      if (currentCard.pairId === this.selectedPairId) {
        currentCard.imageUrl = newImage;
        cards[i + 1].imageUrl = newImage;

        break;
      }
    }

    this.selectedWordDetail = {
      ...this.selectedWordDetail,
      imageUrl: newImage,
    };
    this.newRound = {
      ...this.newRound,
      cards,
    };
  }

  getCourseIdAndLessionId() {
    return (this.activatedRoute.parent as ActivatedRoute).params;
  }

  onSaveRound() {
    if (!this.isNewRoundValid()) {
      return;
    }

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
