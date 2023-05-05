import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IWord } from 'src/app/core/models';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  allWords: IWord[] = [];

  constructor(private router: Router, private wordService: WordService) {}

  ngOnInit(): void {
    this.wordService.getAllWords().subscribe((res: any) => {
      this.allWords = res.data.words;
    });
  }

  goToAddWordRoute() {
    this.router.navigateByUrl('/add-word');
  }
}
