import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchService} from "../../../../services/search.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PetService} from "../../../../services/models/pet.service";
import {Pet} from "../../../../models/models/pet.model";

@Component({
  selector: 'app-allpet',
  templateUrl: './allpet.component.html',
  styleUrls: ['./allpet.component.css']
})
export class AllpetComponent implements OnInit, OnDestroy{

  private _waiting = false;
  private _total: number = 0;
  private _pets: Pet[] = [];
  private _page: number = 0;
  private _active: boolean = true;
  private _servicePet: Subscription | undefined;

  get waiting(){return this._waiting;}

  get total(){return this._total;}

  get pets(){return this._pets;}

  get active(){return this._active;}

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private service: PetService,
              private search: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this.getPets();
  }

  searchPets(value: string) {
    if(value != ''){
      this.search.search('pet', value).subscribe((resp:any) => {
        this._pets = resp.data.filter( (pet:Pet) => pet.active == this._active);
      })
    }else{
      this.getPets();
    }
  }

  changePage(value: number) {
    this._page += value;
    if(this._page < 0){
      this._page = 0
    }else if(this._page * 5 >= this._total){
      this._page -= value;
    }
    this.getPets();
  }

  async deletePet(id: string) {
    const {value, isConfirmed} =await Swal.fire<string>({
      title: '¿Quieres eliminar el animal?',
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
      this.service.deletePet(id, data).subscribe({
        next: resp => {
          this.getPets();
          Swal.fire('Eliminado!', resp.msg, 'success')
        },
        error: err => {
          Swal.fire('Error', err.msg, 'info')
        }});
    }
  }

  openUser(item : any) {
    this.router.navigateByUrl(`main/model/user/${item._id}`);
  }

  infoElement(item: any, type: string) {
    if(item._id){
      this.router.navigateByUrl(`main/model/${type}/${item._id}`);
    }else{
      this.router.navigateByUrl(`main/model/${type}/${item.id}`);
    }
  }

  private async getPets() {
    this._waiting = true;
    this._pets = [];
    if(this._servicePet){
      await this._servicePet.unsubscribe();
    }
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    this._servicePet = this.service.getPets(this._page, this.active).subscribe((resp:any) => {
      this._total = resp.total;
      if(resp.data.length !== 0){
        this._pets = resp.data
      }
      this._waiting = false;
    })
  }

  activePets(value:boolean) {
    this._active = value;
    this.getPets();
  }

  activePet(item: Pet) {
    item.active = true;
    const object: any = item.breed;
    const data = {
      ...item,
      breed: object._id,
    }
    this.service.updatePet(data).subscribe( {
      next: (resp:any) =>{
        this.getPets();
        Swal.fire('Actualizado!', resp.msg, 'success')
      },
      error: err => {
        Swal.fire('Cambios no guardados',err.msg, 'info');
      }});
  }

  openPet(item: any) {
    this.router.navigateByUrl(`main/pet/${item._id}`);
  }

  updateElement(id: string) {
    this.router.navigateByUrl(`main/pet/${id}`);
  }

  createPet() {
    this.router.navigateByUrl(`main/pet/new`);
  }

  ngOnDestroy(){
    if(this._servicePet){
      this._servicePet.unsubscribe();
    }
  }
}
