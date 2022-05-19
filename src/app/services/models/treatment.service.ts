import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Treatment} from "../../models/models/treatment.model";

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private _baseUrl = environment.base_url;

  private _idPet: String = '';

  get pet(): String{
    return this._idPet!;
  }

  set pet(id: String){
    this._idPet = id;
  }

  constructor(private http: HttpClient) { }


  createTreatment( formData : any ): Observable<any>{
    return this.http.post<any>(`${this._baseUrl}/treatment`, formData);
  }

  updateTreatment( treatment: Treatment): Observable<any>{
    console.log(treatment)
    return this.http.put<any>(`${this._baseUrl}/treatment/${treatment.id}`,
      treatment);
  }

  getTreatments(num : number, active: boolean = true): Observable<any>{
    return this.http.get<any>(`${this._baseUrl}/treatment/all/${active}?page=${num}`);
  }

  getAllTreatments(): Observable<any>{
    return this.http.get<any>(`${this._baseUrl}/treatment/pages/all`);
  }

  getOneTreatment(id : string): Observable<any>{
    return this.http.get<any>(`${this._baseUrl}/treatment/one/${id}`);
  }

  deleteTreatment(id: string, data:any): Observable<any>{
    return this.http.put<any>(`${this._baseUrl}/treatment/delete/${id}`, data);
  }
}
