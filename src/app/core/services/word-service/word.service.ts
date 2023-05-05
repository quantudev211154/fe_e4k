import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { INewWord } from '../../models';
import { API } from '../../constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(private httpService: HttpService, private router: Router) {}

  public getAllWords() {
    return this.httpService.get(API.GET_ALL_WORDS_URL);
  }

  public addNewWord(newWord: INewWord, onFailure?: Function) {
    this.httpService.post(API.ADD_NEW_WORD_URL, newWord).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        if (onFailure) onFailure();
      }
    );
  }
}
