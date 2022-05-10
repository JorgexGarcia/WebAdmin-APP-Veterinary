import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/models/user.model";
import {SearchService} from "../../../services/search.service";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";

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
  public active: boolean = true;
  private _serviceUser: Subscription | undefined;

  constructor(private service: UserService,
              private search: SearchService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  searchUsers(value: string) {
    if(value != ''){
      this.search.search('user', value).subscribe((resp:any) => {
        this.users = resp.data.filter( (user:User) => user.active == true);
      })
    }else{
      this.getUsers();
    }
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
    this._serviceUser = this.service.getUsers(this._page, this.active).subscribe((resp:any) => {
      this.total = resp.total;
      if(resp.data.length !== 0){
        this.users = resp.data
      }
      this.waiting = false;
    })
  }

  async activeUsers(value:boolean) {
    this.active = value;
    console.log(this.users);
    this.users = [];
    if(this._serviceUser){
      await this._serviceUser.unsubscribe();
    }
    document.getElementById('txtTer')!.textContent = '';
    this.getUsers();
  }

  activeUser(item: User) {
    item.password = '123456';
    this.service.createUser(item).subscribe( resp =>{
      console.log(resp)
        this.getUsers();
       Swal.fire('Actualizado!', '', 'success')
    },error => {
      console.log(error)
        Swal.fire('Cambios no guardados','', 'info');
      });
  }
}
