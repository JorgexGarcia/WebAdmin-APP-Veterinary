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

  private _data: any = {};

  private _treatment: any;

  private _finish: boolean = false;

  get finish(){
    return this._finish;
  }

  set finish(item:boolean){
    this._finish = item;
  }

  get treatment(){
    return this._treatment;
  }

  set treatment(item : any){
    this._treatment = item;
  }

  get data(){
    return this._data;
  }

  set data(data: any){
    this._data = data;
  }

  constructor(private http: HttpClient) { }


  createTreatment( formData : any ): Observable<any>{
    return this.http.post<any>(`${this._baseUrl}/treatment`, formData);
  }

  updateTreatment( treatment: Treatment): Observable<any>{
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
