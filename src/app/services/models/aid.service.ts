import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Aids} from "../../models/models/aids.model";

@Injectable({
  providedIn: 'root'
})
export class AidService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }

  createAid(formData: any): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}/aids`, formData);
  }

  updateAid(aid: Aids): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/aids/${aid.id}`,
      aid);
  }

  getAids(num: number): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/aids?page=${num}`);
  }

  getOneAid(id: string): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/aids/${id}`);
  }

  deleteAid(id: string): Observable<any> {
    return this.http.delete<any>(`${this._baseUrl}/aids/${id}`);
  }
}
