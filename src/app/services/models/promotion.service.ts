import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Promotion} from "../../models/models/promotion.model";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  createPromotion(formData: any): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}/promotion`, formData);
  }

  updatePromotion(promotion: Promotion): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/promotion/${promotion.id}`,
      promotion);
  }

  getPromotions(num: number, active: boolean = true): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/promotion/all/${active}?page=${num}`);
  }

  getPromotionsAll(): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/promotion/pages/all`);
  }

  getOnePromotion(id: string): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/promotion/one/${id}`);
  }

  deletePromotion(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/promotion/delete/${id}`, data);
  }
}
