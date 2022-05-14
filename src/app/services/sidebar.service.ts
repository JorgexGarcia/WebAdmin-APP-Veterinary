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
      tittle: 'Mantenimiento',
      icon: "mdi mdi-table",
      submenu: [
        { tittle: 'Usuarios' , url : 'users'},
        { tittle: 'Razas' , url : 'breeds'},
        { tittle: 'Promociones' , url : 'promotions'},
        { tittle: 'Productos' , url : 'products'},
      ]
    }
  ]

  get menu(){
    return this._menu;
  }

  constructor() {}

}
