import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchService} from "../../../../services/search.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Aids} from "../../../../models/models/aids.model";
import {AidService} from "../../../../services/models/aid.service";

@Component({
  selector: 'app-allaid',
  templateUrl: './allaid.component.html',
  styleUrls: ['./allaid.component.css']
})
export class AllaidComponent implements OnInit, OnDestroy{

  private _waiting = false;
  private _total: number = 0;
  private _aids: Aids[] = [];
  private _page: number = 0;
  private _serviceAid: Subscription | undefined;

  get waiting(){return this._waiting;}

  get total(){return this._total;}

  get aids(){return this._aids;}

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private aidService: AidService,
              private search: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this._getAids();
  }

  private async _getAids() {
    this._waiting = true;
    this._aids = [];
    if(this._serviceAid){
      await this._serviceAid.unsubscribe();
    }
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    this._serviceAid = this.aidService.getAids(this._page)
      .subscribe((resp:any) => {
        this._total = resp.total;
        if(resp.data.length !== 0){
          this._aids = resp.data
        }
        this._waiting = false;
      })
  }

  searchAids(value: string) {
    if(value != ''){
      this.search.search('aids', value).subscribe((resp:any) => {
        this._aids = resp.data;
      });
    }else{
      this._getAids();
    }
  }

  createAid() {
    this.router.navigateByUrl(`main/aids/new`);
  }

  updateElement(id: string) {
    this.router.navigateByUrl(`main/aids/${id}`);
  }

  async deleteAid(id: string) {
    const {isConfirmed} = await Swal.fire<string>({
      title: '¿Quieres eliminar el consejo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,elimina!',
      cancelButtonText: 'Cancelar'
    });
    if (isConfirmed) {
      this.aidService.deleteAid(id).subscribe({
        next: resp => {
          this._getAids();
          Swal.fire('Eliminado!', resp.msg, 'success')
        },
        error: err => {
          Swal.fire('Error', err.msg, 'info')
        }});
    }
  }

  changePage(number: number) {
    this._page += number;
    if(this._page < 0){
      this._page = 0
    }else if(this._page * 5 >= this._total){
      this._page -= number;
    }
    this._getAids();
  }

  infoElement(id: string) {
    this.router.navigateByUrl(`main/model/aids/${id}`);
  }

  ngOnDestroy(){
    if(this._serviceAid){
      this._serviceAid.unsubscribe();
    }
  }

  go(item: any) {
    this.router.navigateByUrl(`/main/model/user/${item._id}`);
  }
}
