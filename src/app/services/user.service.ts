import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginForm} from "../models/interfaces/interfacesForms.interface";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  crearUsuario( formData : any ){
    return this.http.post(`${this._baseUrl}/user`, formData);
  }

  login( formData : LoginForm){
    return this.http.post(`${this._baseUrl}/auth`, formData)
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }
}
