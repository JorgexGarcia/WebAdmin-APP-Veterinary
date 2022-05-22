import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Product} from "../../../models/models/product.model";
import {ProductService} from "../../../services/models/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnDestroy {

  private _data: Product | undefined;
  private _id: string = '';
  private _waiting = false;
  private _subscription: Subscription | undefined;

  get data():Product{
    return this._data!;
  }

  get waiting(){return this._waiting;}

  constructor(private service: ProductService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this._waiting = true;
    this.get();
  }

  async get(){
    this._id = this.activatedRoute.snapshot.params['id'];
    this._subscription = await this.service.getOneProduct(this._id)
      .subscribe({
        next: resp => {
          this._data = resp.data;
          if(!this._data) this.route.navigateByUrl('main');
          this._waiting = false;
        },
        error: err => {Swal.fire('Error', err.error.msg, 'error');
          this.route.navigateByUrl('main');}
      });
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  edit() {
    this.route.navigateByUrl(`main/product/${this._data!.id}`);
  }

  back() {
    this.route.navigateByUrl(`main/products`);
  }
}

