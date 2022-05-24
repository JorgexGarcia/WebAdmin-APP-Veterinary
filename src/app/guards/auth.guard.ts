import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {UserService} from "../services/models/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  //Guard para comprobar el token
  constructor(private service: UserService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.service.checkToken().pipe(
      tap( isAuth => {
        if( !isAuth ){
          this.router.navigateByUrl('/login');
        }
      })
    );

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.service.checkToken().pipe(
      tap( isAuth => {
        if( !isAuth ){
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
