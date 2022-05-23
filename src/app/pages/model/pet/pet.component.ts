import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Pet} from "../../../models/models/pet.model";
import {PetService} from "../../../services/models/pet.service";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnDestroy {

  private _data: Pet | undefined;
  private _id: string = '';
  private _waiting = false;
  private _subscription: Subscription | undefined;

  get data():Pet{
    return this._data!;
  }

  get waiting(){return this._waiting;}

  constructor(private service: PetService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this._waiting = true;
    this.get();
  }

  async get(){
    this._id = this.activatedRoute.snapshot.params['id'];
    this._subscription = await this.service.getOnePet(this._id)
      .subscribe({
        next: resp => {
          this._data = resp.data;
          console.log(this._data)
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
    this.route.navigateByUrl(`main/pet/${this._data!.id}`);
  }

  open(item: any, type: string) {
    if(item._id){
      this.route.navigateByUrl(`main/model/${type}/${item._id}`);
    }else{
      this.route.navigateByUrl(`main/model/${type}/${item.id}`);
    }
  }

  back() {
    this.route.navigateByUrl(`main/pets`);
  }
}


