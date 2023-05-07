import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayService {
  constructor() {}

  shuffleArray(array: Array<any>) {
    return array.sort(() => Math.random() - 0.5);
  }
}
