import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Treatment} from "../../../models/models/treatment.model";
import {TreatmentService} from "../../../services/models/treatment.service";

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnDestroy {

  private _data: Treatment | undefined;
  private _id: string = '';
  private _waiting = false;
  private _subscription: Subscription | undefined;

  get data():Treatment{
    return this._data!;
  }

  get waiting(){return this._waiting;}

  constructor(private service: TreatmentService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this._waiting = true;
    this.get();
  }

  async get(){
    this._id = this.activatedRoute.snapshot.params['id'];
    this._subscription = await this.service.getOneTreatment(this._id)
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
    this.route.navigateByUrl(`main/treatment/${this._data!.id}`);
  }

  open(item: any, type: string) {
    if(item._id){
      this.route.navigateByUrl(`main/model/${type}/${item._id}`);
    }else{
      this.route.navigateByUrl(`main/model/${type}/${item.id}`);
    }
  }

  back() {
    this.route.navigateByUrl(`main/treatments`);
  }
}
