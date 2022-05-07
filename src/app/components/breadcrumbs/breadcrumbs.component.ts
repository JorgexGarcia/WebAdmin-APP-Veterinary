import {Component, OnDestroy} from '@angular/core';
import {ActivationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy{

  private _tittle: string = '';
  private _tittleSubs: Subscription;

  get tittle(){
    return this._tittle
  }

  constructor(private router: Router) {
    this._tittleSubs = this.getDataRoute()
      .subscribe(({tittle}) => {
        this._tittle = tittle;
        document.title = tittle
      });
  }

  getDataRoute(){
    return this.router.events
      .pipe(
        filter( (event:any) => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data)
      );
  }

  ngOnDestroy(): void {
    this._tittleSubs.unsubscribe();
  }

}
