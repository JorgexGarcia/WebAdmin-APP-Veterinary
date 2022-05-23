import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchService} from "../../../../services/search.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Queries} from "../../../../models/models/queries.model";
import {QueriesService} from "../../../../services/models/queries.service";

@Component({
  selector: 'app-allqueries',
  templateUrl: './allqueries.component.html',
  styleUrls: ['./allqueries.component.css']
})
export class AllqueriesComponent implements OnInit, OnDestroy{

  private _waiting = false;
  private _total: number = 0;
  private _queries: Queries[] = [];
  private _page: number = 0;
  private _active: boolean = true;
  private _serviceQueries: Subscription | undefined;

  get waiting(){return this._waiting;}

  get total(){return this._total;}

  get queries(){return this._queries;}

  get active(){return this._active;}

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private queriesService: QueriesService,
              private search: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this._getQueries();
  }

  private async _getQueries() {
    this._waiting = true;
    this._queries = [];
    if(this._serviceQueries){
      await this._serviceQueries.unsubscribe();
    }
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    this._serviceQueries = this.queriesService.getQueries(this._page, this.active)
      .subscribe((resp:any) => {
        this._total = resp.total;
        if(resp.data.length !== 0){
          this._queries = resp.data
        }
        this._waiting = false;
      })
  }

  getSearch(value: string) {
    if(value != ''){
      this.search.search('queries', value).subscribe((resp:any) => {
        this._queries = resp.data.filter( (item:Queries) => item.active == this._active);
      });
    }else{
      this._getQueries();
    }
  }

  infoElement(id: string) {
    this.router.navigateByUrl(`main/model/queries/${id}`);
  }

  create() {
    this.router.navigateByUrl(`main/queries/new`);
  }

  update(id: string) {
    this.router.navigateByUrl(`main/queries/${id}`);
  }

  open(item : any, type:string) {
    this.router.navigateByUrl(`main/model/${type}/${item._id}`);
  }

  async delete(id: string) {
    const {value, isConfirmed} = await Swal.fire<string>({
      title: '¿Quieres eliminar la consulta?',
      icon: 'warning',
      input: 'text',
      inputPlaceholder: 'Motivo',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,elimina!',
      cancelButtonText: 'Cancelar'
    });
    if (isConfirmed) {
      let data;
      if(value){
        data = {
          reason: value
        }
      } else {
        data = {}
      }
      this.queriesService.deleteQueries(id, data).subscribe({
        next: resp => {
          this._getQueries();
          Swal.fire('Eliminado!', resp.msg, 'success')
        },
        error: err => {
          Swal.fire('Error', err.msg, 'info')
        }});
    }
  }

  getActive(item: Queries) {
    item.active = true;
    this.queriesService.updateQueries(item).subscribe({
      next: (resp:any )=> {
        this._waiting = false;
        Swal.fire('Actualizado!', resp.msg, 'success');
        this._getQueries();
      },
      error: err => {
        this._waiting = false;
        Swal.fire('Cambios no guardados', err.error.msg, 'info')
      }
    });
  }

  changePage(number: number) {
    this._page += number;
    if(this._page < 0){
      this._page = 0
    }else if(this._page * 5 >= this._total){
      this._page -= number;
    }
    this._getQueries();
  }

  activeSet(b: boolean) {
    this._active = b;
    this._getQueries();
  }

  ngOnDestroy(){
    if(this._serviceQueries){
      this._serviceQueries.unsubscribe();
    }
  }
}
