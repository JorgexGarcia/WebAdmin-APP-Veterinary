import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../../services/models/user.service";
import {User} from "../../../../models/models/user.model";
import {SearchService} from "../../../../services/search.service";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {

  private _waiting = false;
  private _total: number = 0;
  private _users: User[] = [];
  private _page: number = 0;
  private _active: boolean = true;
  private _serviceUser: Subscription | undefined;

  get waiting(){return this._waiting;}

  get total(){return this._total;}

  get users(){return this._users;}

  get active(){return this._active;}

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private service: UserService,
              private search: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  searchUsers(value: string) {
    if(value != ''){
      this.search.search('user', value).subscribe((resp:any) => {
        this._users = resp.data.filter( (user:User) => user.active == true);
      })
    }else{
      this.getUsers();
    }
  }

  changePage(value: number) {
    this._page += value;
    if(this._page < 0){
      this._page = 0
    }else if(this._page * 5 >= this._total){
      this._page -= value;
    }
    this.getUsers();
  }

  deleteUser(id: string) {
    if(this.service.userActive.id !== id){
      Swal.fire({
        title: '¿Quieres eliminar el usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,elimina!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteUser(id).subscribe({
            next: resp => {
              this.getUsers();
              Swal.fire('Eliminado!', resp.msg, 'success')
            },
            error: err => {
              Swal.fire('Error', err.msg, 'info')
            }});
        }
      });
    }else{
      Swal.fire('Error', 'No puedes eliminarte', 'error')
    }
  }

  openPet(id: string) {

  }

  private async getUsers() {
    this._waiting = true;
    this._users = [];
    if(this._serviceUser){
      await this._serviceUser.unsubscribe();
    }
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    this._serviceUser = this.service.getUsers(this._page, this.active).subscribe((resp:any) => {
      this._total = resp.total;
      if(resp.data.length !== 0){
        this._users = resp.data
      }
      this._waiting = false;
    })
  }

  activeUsers(value:boolean) {
    this._active = value;
    this.getUsers();
  }

  activeUser(item: User) {
    item.password = '123456';
    this.service.createUser(item).subscribe( {
      next: (resp:any) =>{
        this.getUsers();
       Swal.fire('Actualizado!', resp.msg, 'success')
      },
      error: err => {
        Swal.fire('Cambios no guardados',err.msg, 'info');
      }});
  }

  openPromotion(id: string) {

  }

  updateElement(id: string) {
    this.router.navigateByUrl(`main/user/${id}`);
  }

  createUser() {
    this.router.navigateByUrl(`main/user/new`);
  }
}
