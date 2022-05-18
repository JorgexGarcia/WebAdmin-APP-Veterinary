import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Breed} from "../../models/models/breed.model";

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }


  createBreed( formData : any ): Observable<any>{
    return this.http.post<any>(`${this._baseUrl}/breed`, formData);
  }

  updateBreed( breed: Breed): Observable<any>{
    return this.http.put<any>(`${this._baseUrl}/breed/${breed.id}`,
      breed);
  }

  getBreeds(num : number, active: boolean = true): Observable<any>{
    return this.http.get<any>(`${this._baseUrl}/breed/all/${active}?page=${num}`);
  }

  getAllBreeds(): Observable<any>{
    return this.http.get<any>(`${this._baseUrl}/breed/pages/all`);
  }

  getOneBreed(id : string): Observable<any>{
    return this.http.get<any>(`${this._baseUrl}/breed/one/${id}`);
  }

  deleteBreed(id: string, data:any): Observable<any>{
    return this.http.put<any>(`${this._baseUrl}/breed/delete/${id}`, data);
  }
}
