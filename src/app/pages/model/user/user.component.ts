import {Component, OnDestroy} from '@angular/core';
import {User} from "../../../models/models/user.model";
import {UserService} from "../../../services/models/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy {

  private _user: User | undefined;
  private _id: string = '';
  private _waiting = false;
  private _userSubscription: Subscription | undefined;

  get user():User{
    return this._user!;
  }

  get waiting(){return this._waiting;}

  constructor(private userService: UserService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this._waiting = true;
    this.getUser();
  }

  async getUser(){
    this._id = this.activatedRoute.snapshot.params['id'];
    this._userSubscription = await this.userService.getOneUser(this._id)
      .subscribe({
        next: resp => {
          this._user = resp.data;
          if(!this._user) this.route.navigateByUrl('main');
          this._waiting = false;
        },
        error: err => {Swal.fire('Error', err.error.msg, 'error');
          this.route.navigateByUrl('main');}
      });
  }

  open(item: any, type: string) {
    this.route.navigateByUrl(`main/model/${type}/${item._id}`);
  }

  ngOnDestroy(): void {
    this._userSubscription?.unsubscribe();
  }

  edit() {
    this.route.navigateByUrl(`main/user/${this._user!.id}`);
  }

  back() {
    this.route.navigateByUrl(`main/users`);
  }
}
