import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _elem = document.querySelector('#theme');
  private _links: NodeListOf<Element> | undefined ;

  constructor() {
    if(this._elem){
      const color = localStorage.getItem('color') || 'default';
      this._elem.setAttribute('href', `./assets/css/colors/${color}.css` );
    }
  }

  changeTheme(color: string) {
    if(this._elem){
      this._elem.setAttribute('href', `./assets/css/colors/${color}.css`);
      localStorage.setItem('color', color);
    }
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    this._links = document.querySelectorAll('.selector');
    if(this._links){
      this._links.forEach(elem => {
        elem.classList.remove('working');
        const btnTheme = elem.getAttribute('data-theme');
        if(this._elem){
          if(`./assets/css/colors/${btnTheme}.css` === this._elem.getAttribute('href')){
            elem.classList.add('working');
          }
        }
      });
    }
  }


}
