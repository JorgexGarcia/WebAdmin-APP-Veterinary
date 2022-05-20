import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Service} from "../../models/models/service.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }

  createService(formData: any): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}/service`, formData);
  }

  updateService(service: Service): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/service/${service.id}`,
      service);
  }

  getServices(num: number, active: boolean = true): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/service/all/${active}?page=${num}`);
  }

  getServicesAll(): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/service/page/all`);
  }

  getOneService(id: string): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/service/one/${id}`);
  }

  deleteService(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/service/delete/${id}`, data);
  }
}
