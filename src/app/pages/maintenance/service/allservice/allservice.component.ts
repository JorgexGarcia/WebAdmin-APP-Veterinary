import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchService} from "../../../../services/search.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Service} from "../../../../models/models/service.model";
import {ServiceService} from "../../../../services/models/service.service";

@Component({
  selector: 'app-allservice',
  templateUrl: './allservice.component.html',
  styleUrls: ['./allservice.component.css']
})
export class AllserviceComponent implements OnInit, OnDestroy{

  private _waiting = false;
  private _total: number = 0;
  private _services: Service[] = [];
  private _page: number = 0;
  private _active: boolean = true;
  private _serviceService: Subscription | undefined;

  get waiting(){return this._waiting;}

  get total(){return this._total;}

  get services(){return this._services;}

  get active(){return this._active;}

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private serviceService: ServiceService,
              private search: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this._getServices();
  }

  private async _getServices() {
    this._waiting = true;
    this._services = [];
    if(this._serviceService){
      await this._serviceService.unsubscribe();
    }
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    this._serviceService = this.serviceService.getServices(this._page, this.active)
      .subscribe((resp:any) => {
      this._total = resp.total;
      if(resp.data.length !== 0){
        this._services = resp.data
      }
      this._waiting = false;
    })
  }

  searchServices(value: string) {
    if(value != ''){
      this.search.search('service', value).subscribe((resp:any) => {
        this._services = resp.data.filter( (service:Service) => service.active == this._active);
      });
    }else{
      this._getServices();
    }
  }

  createService() {
    this.router.navigateByUrl(`main/service/new`);
  }

  updateElement(id:string) {
    this.router.navigateByUrl(`main/service/${id}`);
  }

  async deleteService(id:string) {
    const {value, isConfirmed} =await Swal.fire<string>({
      title: '¿Quieres eliminar el servicio?',
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
      this.serviceService.deleteService(id, data).subscribe({
        next: resp => {
          this._getServices();
          Swal.fire('Eliminado!', resp.msg, 'success')
        },
        error: err => {
          Swal.fire('Error', err.msg, 'info')
        }});
    }
  }

  activeService(item: any) {
    item.active = true;
    this.serviceService.updateService(item).subscribe({
      next: (resp:any )=> {
        this._waiting = false;
        Swal.fire('Actualizado!', resp.msg, 'success');
        this._getServices();
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
    this._getServices();
  }

  activeServices(b: boolean) {
    this._active = b;
    this._getServices();
  }

  ngOnDestroy(){
    if(this._serviceService){
      this._serviceService.unsubscribe();
    }
  }
}

