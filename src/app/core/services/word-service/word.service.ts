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

  public getAllWords(page: number) {
    return this.httpService.get(API.GET_ALL_WORDS_URL + `?page=${page}`);
  }

  public addNewWord(newWord: INewWord) {
    return this.httpService.post(API.ADD_NEW_WORD_URL, newWord);
  }

  public updateWord(word: INewWord, wordId: string) {
    return this.httpService.put(`${API.UPDATE_WORD_BY_ID_URL}/${wordId}`, word);
  }

  public searchWordByKeyword(keyword: string) {
    return this.httpService.post(API.SEARCH_WORD_BY_KEYWORD_URL, { keyword });
  }

  public getWordById(wordId: string) {
    return this.httpService.get(`${API.GET_WORD_BY_ID_URL}/${wordId}`);
  }
}
