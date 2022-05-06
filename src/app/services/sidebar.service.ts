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
        { tittle: 'Principal' , url : '/main'}
      ]
    }
  ]

  get menu(){
    return this._menu;
  }

  constructor() { }
}
