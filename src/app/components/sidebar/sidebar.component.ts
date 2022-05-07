import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private _menu: any[] = [];
  public imgUrl: string = '';
  public name: string = '';

  get menu(){
    return this._menu;
  }

  constructor(private sidebarService: SidebarService,
              private service: UserService) {
    this._menu = sidebarService.menu;
    this.imgUrl = this.service.imgUrl;
    this.name = this.service.name;
  }

  ngOnInit(): void {
  }

  logOut() {
    this.service.logout();
  }
}
