import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public imgUrl: string = '';
  public name: string = '';
  public email: string = '';

  constructor(private service: UserService) {
    this.imgUrl = this.service.imgUrl;
    this.name = this.service.name;
    this.email = this.service.email;
  }

  ngOnInit(): void {
  }

  logOut(){
    this.service.logout();
  }
}
