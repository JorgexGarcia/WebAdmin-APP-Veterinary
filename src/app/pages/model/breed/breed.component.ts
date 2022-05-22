import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Breed} from "../../../models/models/breed.model";
import {BreedService} from "../../../services/models/breed.service";

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css']
})
export class BreedComponent implements OnDestroy {

private _breed: Breed | undefined;
private _id: string = '';
private _waiting = false;
private _subscription: Subscription | undefined;

  get breed():Breed{
    return this._breed!;
  }

  get waiting(){return this._waiting;}

  constructor(private service: BreedService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this._waiting = true;
    this.get();
  }

  async get(){
    this._id = this.activatedRoute.snapshot.params['id'];
    this._subscription = await this.service.getOneBreed(this._id)
      .subscribe({
        next: resp => {
          this._breed = resp.data;
          if(!this._breed) this.route.navigateByUrl('main');
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
    this.route.navigateByUrl(`main/breed/${this._breed!.id}`);
  }

  back() {
    this.route.navigateByUrl(`main/breeds`);
  }
}
