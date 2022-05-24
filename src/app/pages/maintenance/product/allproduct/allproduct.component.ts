import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchService} from "../../../../services/search.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Product} from "../../../../models/models/product.model";
import {ProductService} from "../../../../services/models/product.service";

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit, OnDestroy{

  private _waiting = false;
  private _total: number = 0;
  private _products: Product[] = [];
  private _page: number = 0;
  private _active: boolean = true;
  private _serviceProduct: Subscription | undefined;

  get waiting(){return this._waiting;}

  get total(){return this._total;}

  get products(){return this._products;}

  get active(){return this._active;}

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private productService: ProductService,
              private search: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this._getProducts();
  }

  infoElement(id: string) {
    this.router.navigateByUrl(`main/model/product/${id}`);
  }

  private async _getProducts() {
    this._waiting = true;
    this._products = [];
    if(this._serviceProduct){
      await this._serviceProduct.unsubscribe();
    }
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    this._serviceProduct = this.productService.getProduct(this._page, this.active)
      .subscribe((resp:any) => {
        this._total = resp.total;
        if(resp.data.length !== 0){
          this._products = resp.data
        }
        this._waiting = false;
      })
  }

  searchProduct(value: string) {
    if(value != ''){
      this.search.search('product', value).subscribe((resp:any) => {
        this._products = resp.data.filter( (product:Product) => product.active == this._active);
      });
    }else{
      this._getProducts();
    }
  }

  createProduct() {
    this.router.navigateByUrl(`main/product/new`);
  }

  updateElement(id: string) {
    this.router.navigateByUrl(`main/product/${id}`);
  }

  async deleteProduct(id: string) {
    const {value, isConfirmed} = await Swal.fire<string>({
      title: '¿Quieres eliminar el producto?',
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
      this.productService.deleteProduct(id, data).subscribe({
        next: resp => {
          this._getProducts();
          Swal.fire('Eliminado!', resp.msg, 'success')
        },
        error: err => {
          Swal.fire('Error', err.msg, 'info')
        }});
    }
  }

  activeProduct(item: Product) {
    item.active = true;
    this.productService.updateProduct(item).subscribe({
      next: (resp:any )=> {
        this._waiting = false;
        Swal.fire('Actualizado!', resp.msg, 'success');
        this._getProducts();
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
    this._getProducts();
  }

  activeProducts(b: boolean) {
    this._active = b;
    this._getProducts();
  }

  ngOnDestroy(){
    if(this._serviceProduct){
      this._serviceProduct.unsubscribe();
    }
  }
}
