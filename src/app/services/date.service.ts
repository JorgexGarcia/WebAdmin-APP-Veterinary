import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _date: any[] = [
    "",

  ]

  get date(){
    return this._date;
  }
}
