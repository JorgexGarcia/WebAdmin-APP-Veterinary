import {Component, OnDestroy} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {UserService} from "../../services/models/user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy{

  private _menu: any[] = [];
  public imgUrl: string = '';
  public name: string = '';

  private _interval;

  get menu(){
    return this._menu;
  }

  constructor(private sidebarService: SidebarService,
              private service: UserService) {
    this._menu = sidebarService.menu;
    this._interval = setInterval(() => {

      this.imgUrl = service.imgUrl;
      this.name = service.name;

    },100);

  }

  logOut() {
    this.service.logout();
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }
}
