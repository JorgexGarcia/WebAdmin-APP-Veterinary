import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Queries} from "../../models/models/queries.model";

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  private _newDate: boolean = false;
  private _date: Date = new Date();

  get date():Date {
    return this._date;
  }

  set date(item:Date){
    this._date = item;
  }

  get newDate() {
    return this._newDate;
  }

  set newDate(item:boolean){
    this._newDate = item;
  }

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }

  createQueries(formData: any): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}/queries`, formData);
  }

  updateQueries(item: Queries): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/queries/${item.id}`,
      item);
  }

  getQueries(num: number, active: boolean = true): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/queries/all/${active}?page=${num}`);
  }

  getQueriesAll(): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/queries/pages/all`);
  }

  getOneQueries(id: string): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/queries/one/${id}`);
  }

  deleteQueries(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/queries/delete/${id}`, data);
  }
}
