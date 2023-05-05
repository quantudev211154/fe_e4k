import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  constructor() {}

  public generateRandomHEXAColor(): string {
    return (
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)
    );
  }

  public generateRandomUUID(): string {
    return `${this.generateRandomHEXAColor()}-${uuidV4()}`;
  }
}
