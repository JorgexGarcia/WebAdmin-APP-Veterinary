import {Injectable} from '@angular/core';
import {QueriesService} from "./models/queries.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private queriesService: QueriesService,
              private router: Router) {
  }

  getData(): Observable<any>{
    return this.queriesService.getQueriesAll().pipe(
      map(res => {
        return res.data.map((item: any) => {
          let color: string;
          if (item.finish) {
            color = '#de6969'
          } else {
            color = '#acf17e';
          }
          return {
            id: item.id,
            title: item.description,
            description: item.finish,
            start: item.startDate,
            finish: item.finishDate,
            backgroundColor: color,
            textColor: '#000',
            borderColor: color,
            allDay: false,
          }
        });
      })
    );
  }

  createDate(date: string) {
    this.queriesService.newDate = true;
    this.queriesService.date = new Date(date);
    this.router.navigateByUrl(`main/queries/new`);
  }

  clickEvent(def: any){
    if(!def.extendedProps.description){
      this.queriesService.newDate = true;
      this.router.navigateByUrl(`main/model/queries/${def.publicId}`);
    }else{
      Swal.fire('Error', 'No puedes acceder a una consulta ya finalizada', 'info');
    }
  }
}
