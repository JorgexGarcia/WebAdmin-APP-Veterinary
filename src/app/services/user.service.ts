import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginForm} from "../models/interfaces/interfacesForms.interface";
import {catchError, Observable, of, tap} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "../models/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = environment.base_url;
  private _userActive: any;

  get userActive(){
    return this._userActive;
  }

  set userActive(user){
    this._userActive = user;
  }

  get imgUrl(){
    return (this._userActive.img)? this._userActive.img.url :
      'https://res.cloudinary.com/app-veterinary/image/upload/v1651750377/91f0d27a-c1a6-4a39-923f-79b266bad604.jpg'
  }

  get name(){
    return this._userActive.name;
  }

  get email(){
    return this._userActive.email;
  }

  get headers(){
    return {
      headers:{
        'token': this.token
      }
    }
  }

  get token(){
    return localStorage.getItem('token') || '';
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  checkToken(): Observable<boolean>{

    return this.http.get(`${this._baseUrl}/auth/renew`,this.headers).pipe(
      map((resp:any) => {
        this._userActive = resp.data;
        this._userActive.password = resp.password;
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(_ => of(false))
    );
  }

  createUser( formData : any ){
    return this.http.post(`${this._baseUrl}/user`, formData, this.headers);
  }

  updateUser( formFata: any){
    const data = {
      dni: this._userActive.dni,
      email: this._userActive.email,
      ... formFata
    }
    return this.http.put(`${this._baseUrl}/user/${this._userActive.id}`, data, this.headers);
  }

  login( formData : LoginForm){
    return this.http.post(`${this._baseUrl}/auth`, formData)
      .pipe(
        tap((resp:any) => {
          if(resp.go){
            localStorage.setItem('token', resp.token)
          }
        })
      );
  }

  getUsers(num : number, active: boolean = true){
    return this.http.get(`${this._baseUrl}/user/${active}?page=${num}`, this.headers);
  }
}