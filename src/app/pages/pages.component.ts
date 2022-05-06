import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  private _elem = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    if(this._elem){
      const color = localStorage.getItem('color') || 'default';
      this._elem.setAttribute('href', `./assets/css/colors/${color}.css` );
    }
  }

}
