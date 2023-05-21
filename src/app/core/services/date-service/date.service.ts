import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  formatToDateTime(dateAsString: string) {
    const dateAsDate = new Date(dateAsString);

    const day = `0${dateAsDate.getDate()}`.slice(-2);
    const month = `0${dateAsDate.getMonth()}`.slice(-2);
    const year = dateAsDate.getFullYear();

    const result = `${day}/${month}/${year} ${dateAsDate.toLocaleTimeString()}`;
    return result;
  }
}
