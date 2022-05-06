import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  private _elem = document.querySelector('#theme');
  private _links: NodeListOf<Element> | undefined ;

  constructor() { }

  ngOnInit(): void {
    this._links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(color: string) {
    if(this._elem){
      this._elem.setAttribute('href', `./assets/css/colors/${color}.css`);
     localStorage.setItem('color', color);
    }

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
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
