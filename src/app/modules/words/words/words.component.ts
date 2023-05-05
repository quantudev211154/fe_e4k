import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  allWords = [];

  constructor(private router: Router, private wordService: WordService) {}

  ngOnInit(): void {
    this.getAllWords();
  }

  goToAddWordRoute() {
    this.router.navigateByUrl('/add-word');
  }

  onGetAllWordsSuccess(words: any) {
    console.log(words);
    this.allWords = words;
  }

  getAllWords() {
    this.wordService.getAllWords().subscribe((res: any) => {
      this.allWords = res.data.words;
    });
  }
}
