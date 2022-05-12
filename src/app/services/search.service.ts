import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  search(type: string, value: string = ''){
    return this.http.get(`${this._baseUrl}/search/model/${type}/${value}`);
  }

  searchAll(value: string){
    return this.http.get(`${this._baseUrl}/search/all/${value}`);
  }

}
