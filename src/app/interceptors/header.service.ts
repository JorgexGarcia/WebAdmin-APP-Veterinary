import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService implements HttpInterceptor{

  constructor() { }

  //Clase para modificar todas las peticiones http y añadir token en el header

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'token' : this.token
    });

    const reqClone = req.clone({headers});

    return next.handle(reqClone);

  }

  get token(){
    return localStorage.getItem('token') || '';
  }
}
