import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchService} from "../../../../services/search.service";
import {Router} from "@angular/router";
import {Promotion} from "../../../../models/models/promotion.model";
import {PromotionService} from "../../../../services/models/promotion.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-allpromotion',
  templateUrl: './allpromotion.component.html',
  styleUrls: ['./allpromotion.component.css']
})
export class AllpromotionComponent implements OnInit, OnDestroy{

  private _waiting = false;
  private _total: number = 0;
  private _promotions: Promotion[] = [];
  private _page: number = 0;
  private _active: boolean = true;
  private _servicePromotion: Subscription | undefined;

  get waiting(){return this._waiting;}

  get total(){return this._total;}

  get promotions(){return this._promotions;}

  get active(){return this._active;}

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private promotionService: PromotionService,
              private search: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this._getPromotions();
  }

  private async _getPromotions() {
    this._waiting = true;
    this._promotions = [];
    if(this._servicePromotion){
      await this._servicePromotion.unsubscribe();
    }
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    this._servicePromotion = this.promotionService.getPromotions(this._page, this.active)
      .subscribe((resp:any) => {
        this._total = resp.total;
        if(resp.data.length !== 0){
          this._promotions = resp.data
      }
      this._waiting = false;
    })
  }

  searchPromotions(value: string) {
    if(value != ''){
      this.search.search('promotion', value).subscribe((resp:any) => {
        this._promotions = resp.data.filter( (promotion:Promotion) => promotion.active == this._active);
      });
    }else{
      this._getPromotions();
    }
  }

  createPromotion() {
    this.router.navigateByUrl(`main/promotion/new`);
  }

  updateElement(id: string) {
    this.router.navigateByUrl(`main/promotion/${id}`);
  }

  async deletePromotion(id: string) {
    const {value, isConfirmed} = await Swal.fire<string>({
      title: '¿Quieres eliminar la promoción?',
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
      this.promotionService.deletePromotion(id, data).subscribe({
        next: resp => {
          this._getPromotions();
          Swal.fire('Eliminado!', resp.msg, 'success')
        },
        error: err => {
          Swal.fire('Error', err.msg, 'info')
        }});
    }
  }

  activePromotion(item: Promotion) {
    item.active = true;
    this.promotionService.updatePromotion(item).subscribe({
      next: (resp:any )=> {
        this._waiting = false;
        Swal.fire('Actualizado!', resp.msg, 'success');
        this._getPromotions();
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
    this._getPromotions();
  }

  activePromotions(b: boolean) {
    this._active = b;
    this._getPromotions();
  }

  ngOnDestroy(){
    if(this._servicePromotion){
      this._servicePromotion.unsubscribe();
    }
  }
}
