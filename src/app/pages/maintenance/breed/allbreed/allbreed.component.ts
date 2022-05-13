import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Breed} from "../../../../models/models/breed.model";
import {BreedService} from "../../../../services/models/breed.service";
import {SearchService} from "../../../../services/search.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-allbreed',
  templateUrl: './allbreed.component.html',
  styleUrls: ['./allbreed.component.css']
})
export class AllbreedComponent implements OnInit, OnDestroy{

  private _waiting = false;
  private _total: number = 0;
  private _breeds: Breed[] = [];
  private _page: number = 0;
  private _active: boolean = true;
  private _serviceBreed: Subscription | undefined;

  get waiting(){return this._waiting;}

  get total(){return this._total;}

  get breeds(){return this._breeds;}

  get active(){return this._active;}

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private breedService: BreedService,
              private search: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this._getBreeds();
  }

  private async _getBreeds() {
    this._waiting = true;
    this._breeds = [];
    if(this._serviceBreed){
      await this._serviceBreed.unsubscribe();
    }
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    this._serviceBreed = this.breedService.getBreeds(this._page, this.active).subscribe((resp:any) => {
      this._total = resp.total;
      if(resp.data.length !== 0){
        this._breeds = resp.data
      }
      this._waiting = false;
    })
  }

  searchBreeds(value: string) {
    if(value != ''){
      this.search.search('breed', value).subscribe((resp:any) => {
        this._breeds = resp.data.filter( (breed:Breed) => breed.active == this._active);
      });
    }else{
      this._getBreeds();
    }
  }

  createBreed() {
    this.router.navigateByUrl(`main/breed/new`);
  }

  updateElement(id:string) {
    this.router.navigateByUrl(`main/breed/${id}`);
  }

  async deleteBreed(id:string) {
    const {value, isConfirmed} =await Swal.fire<string>({
      title: '¿Quieres eliminar la raza?',
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
      this.breedService.deleteBreed(id, data).subscribe({
        next: resp => {
          this._getBreeds();
          Swal.fire('Eliminado!', resp.msg, 'success')
        },
        error: err => {
          Swal.fire('Error', err.msg, 'info')
        }});
    }
  }

  activeBreed(item: any) {
    item.active = true;
    this.breedService.updateBreed(item).subscribe({
      next: (resp:any )=> {
        this._waiting = false;
        Swal.fire('Actualizado!', resp.msg, 'success');
        this._getBreeds();
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
    this._getBreeds();
  }

  activeBreeds(b: boolean) {
    this._active = b;
    this._getBreeds();
  }

  ngOnDestroy(){
    if(this._serviceBreed){
      this._serviceBreed.unsubscribe();
    }
  }
}
