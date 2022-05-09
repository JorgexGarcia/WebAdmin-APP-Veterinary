import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/models/user.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    const user: User = userService.userActive;
    const date = user.birthDate.toString().split('T')[0];
    this._changeForm = this.fb.group({
      name: [user.name,[Validators.required, Validators.minLength(5)]],
      lastName: [user.lastName, [Validators.required, Validators.minLength(5)]],
      birthDate: [date, [Validators.required]],
      phone: [user.phone],
      province: [user.province, [Validators.required, Validators.minLength(2)]],
      city: [user.city, [Validators.required, Validators.minLength(2)]],
      address: [user.address, [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
  }

  save() {
    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._confirmSave()
      }
    });
  }

  private _confirmSave(){
    this._formSubmitted = true;

    if(!this._changeForm.valid){
      return;
    }

    this.userService.updateUser(this.changeForm.value).subscribe({
      next: _ => {
        Swal.fire('Saved!', '', 'success')
      },
      error: _ => {
        Swal.fire('Cambios no guardados', '', 'info')
      }
    })
  }

  fieldNoValid(field: string):boolean {

    if(this._changeForm.get(field)!.invalid && this._formSubmitted){
      return true;
    }else{
      return false;
    }

  }

  openModalImg() {

  }

  openModalPassword() {

  }

  checkDate() {
    const date = new Date();
    if(date < new Date(this.changeForm.get('birthDate')?.value)){
      this.changeForm.get('birthDate')?.setValue(date.toISOString().split('T')[0]);
    }
  }
}
