import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  public imgUrl: string = '';
  public name: string = '';
  public email: string = '';
  private _interval;

  constructor(private service: UserService) {
    this._interval = setInterval(() => {

      this.imgUrl = service.imgUrl;
      this.name = service.name;
      this.email = service.email;

    },100);

  }

  ngOnInit(): void {
  }

  logOut(){
    this.service.logout();
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }
}
