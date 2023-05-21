import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteConstant } from 'src/app/core/constants';
import { IWord } from 'src/app/core/models';
import { ScrollService } from 'src/app/core/services/scroll-service/scroll.service';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  allWords: IWord[] = [];
  currentPage: number = 1;

  searchEngWordForm: FormGroup;
  searchEngWordDebounce = -1;
  searchSuggestions: IWord[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wordService: WordService,
    private scrollService: ScrollService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchEngWordForm = this.fb.group({
      engWord: '',
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const page = params['page'];

      this.currentPage = page ? page : 1;

      this.getWords(this.currentPage);
    });
  }

  getWords(page: number) {
    this.wordService.getAllWords(page).subscribe((res: any) => {
      this.allWords = res.data.words;
    });

    this.scrollService.scrollToTop();
  }

  goToAddWordRoute() {
    this.router.navigateByUrl(
      `${RouteConstant.ROUTE_WORDS}/customize-word?mode=add`
    );
  }

  goToNextPage() {
    this.currentPage++;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });

    this.getWords(this.currentPage);
  }

  goToPreviousPage() {
    this.currentPage--;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });

    this.getWords(this.currentPage);
  }

  goToEditWordPage(wordId: string) {
    this.router.navigateByUrl(
      `${RouteConstant.ROUTE_WORDS}/customize-word?wordId=${wordId}&mode=edit`
    );
  }

  goToViewWordPage(wordId: string) {
    this.router.navigateByUrl(
      `${RouteConstant.ROUTE_WORDS}/customize-word?wordId=${wordId}&mode=view`
    );
  }

  onSearchEngWordInput(event: Event) {
    const target = event.target as HTMLInputElement;

    window.clearTimeout(this.searchEngWordDebounce);

    if (target.value === '') {
      this.searchSuggestions = [];
      return;
    }

    this.searchEngWordDebounce = window.setTimeout(() => {
      this.wordService
        .searchWordByKeyword(target.value)
        .subscribe((res: any) => {
          this.searchSuggestions = res.data.words;
        });
    }, 500);
  }
}
