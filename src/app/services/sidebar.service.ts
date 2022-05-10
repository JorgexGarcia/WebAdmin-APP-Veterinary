import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _menu: any[] = [
    {
      tittle: 'Menú',
      icon: "mdi mdi-arrange-send-backward",
      submenu: [
        { tittle: 'Principal' , url : '/main'},
        { tittle: 'Perfil' , url : '/main/profile'}
      ]
    },
    {
      tittle: 'Información',
      icon: "mdi mdi-table",
      submenu: [
        { tittle: 'Usuarios' , url : 'users'}
      ]
    }
  ]

  get menu(){
    return this._menu;
  }

  constructor() {}

}
