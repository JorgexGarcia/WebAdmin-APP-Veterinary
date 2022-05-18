import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  createPet(formData: any): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}/pet`, formData);
  }

  updatePet(pet: any): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/pet/${pet.id}`,
      pet);
  }

  getPets(num: number, active: boolean = true): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/pet/all/${active}?page=${num}`);
  }

  getPetsAll(): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/pet/pages/all`);
  }

  getOnePet(id: string): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/pet/one/${id}`);
  }

  deletePet(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/pet/delete/${id}`, data);
  }
}

