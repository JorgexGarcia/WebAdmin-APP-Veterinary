import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public waiting = false;
  public total: number = 0;
  public users: User[] = [];
  private _page: number = 0;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  search(value: string) {

  }

  changePage(value: number) {
    this._page += value;
    if(this._page < 0){
      this._page = 0
    }else if(this._page * 5 >= this.total){
      this._page -= value;
    }
    this.getUsers();
  }

  deleteUser(item: any) {

  }

  changeRol(item: any) {

  }

  openModal(item: any) {

  }

  openPet(id: string) {

  }

  private getUsers() {
    this.waiting = true;
    this.service.getUsers(this._page).subscribe((resp:any) => {
      this.total = resp.total;
      if(resp.data.length !== 0){
        this.users = resp.data;
      }
      this.waiting = false;
    })
  }
}
