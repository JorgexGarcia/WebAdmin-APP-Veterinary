import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Aids} from "../../../models/models/aids.model";
import {AidService} from "../../../services/models/aid.service";

@Component({
  selector: 'app-aid',
  templateUrl: './aid.component.html',
  styleUrls: ['./aid.component.css']
})
export class AidComponent implements OnDestroy {

  private _data: Aids | undefined;
  private _id: string = '';
  private _waiting = false;
  private _subscription: Subscription | undefined;

  get data():Aids{
    return this._data!;
  }

  get waiting(){return this._waiting;}

  constructor(private service: AidService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this._waiting = true;
    this.get();
  }

  async get(){
    this._id = this.activatedRoute.snapshot.params['id'];
    this._subscription = await this.service.getOneAid(this._id)
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
    this.route.navigateByUrl(`main/aids/${this._data!.id}`);
  }

  open(item: any, type: string) {
    this.route.navigateByUrl(`main/model/${type}/${item}`);
  }

  back() {
    this.route.navigateByUrl(`main/aids`);
  }
}


