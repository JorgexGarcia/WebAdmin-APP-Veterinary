import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/models/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  public imgUrl: string = '';
  public name: string = '';
  public email: string = '';
  private _interval;

  @ViewChild('txt') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private service: UserService,
              private router: Router ) {
    this._interval = setInterval(() => {

      this.imgUrl = service.imgUrl;
      this.name = service.name;
      this.email = service.email;

    },100);

  }

  ngOnInit(): void {
  }

  logOut(){
    this.service.logout();
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  search(value: string) {
    const nav = document.getElementById('nav-search');
    if(nav) nav.click();
    if(this.searchInput){
      this.searchInput.nativeElement.value = '';
    }
    if(value.length != 0){
      this.router.navigateByUrl(`/main/search/${value}`);
    }
  }
}
