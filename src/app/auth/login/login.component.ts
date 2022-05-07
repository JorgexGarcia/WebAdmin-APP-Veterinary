import { Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || "jorge1@gmail.com", [Validators.required,
      Validators.pattern("[a-zA-Z0-9.-_]{2,}[@]{1}[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
    password: ["123456", [Validators.required,
      Validators.pattern("[a-zA-Z0-9.-_]{6}")]],
    remember: [false]
  });

 private _formSubmitted = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: UserService) { }

  login() {
    this._formSubmitted = true;

    if(!this.loginForm.valid){
      return;
    }

    this.service.login(this.loginForm.value)
      .subscribe({
        next: _ => {
          if(this.loginForm.get('remember')!.value){
            localStorage.setItem('email', this.loginForm.get('email')?.value);
          }else{
            localStorage.removeItem('email');
          }
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  }

  fieldNoValid(value: string):boolean {
    return this.loginForm.get(value)!.invalid && this._formSubmitted;
  }
}
