import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/models/user.service";
import Swal from "sweetalert2";
import {ModalimgService} from "../../services/modalimg.service";

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
              private userService: UserService,
              private modalService: ModalimgService) {

    const user = userService.userActive;
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


    this.userService.updateSameUser(this.changeForm.value).subscribe({
      next: (resp:any )=> {
        const user = resp.data;
        user.password = resp.password;
        this.userService.userActive = user;
        Swal.fire('Actualizado!', resp.msg, 'success')
      },
      error: err => {
        Swal.fire('Cambios no guardados', err.msg, 'info')
      }
    })
  }

  fieldNoValid(field: string):boolean {

    return this._changeForm.get(field)!.invalid && this._formSubmitted;

  }

  openModalImg() {
      this.modalService.openModal('user',
        this.userService.userActive.id);
  }

  async changePassword() {
    const { value: password } = await Swal.fire({
      title: 'Introduce la contraseña',
      input: 'password',
      inputLabel: 'Contraseña',
      inputPlaceholder: 'Contraseña',
    })
    if (password && password.length >= 6) {
      const { value: password2 } = await Swal.fire({
        title: 'Introduce de nuevo la contraseña',
        input: 'password',
        inputLabel: 'Contraseña',
        inputPlaceholder: 'Contraseña',
      })
      if (password === password2) {
        this.updatePassword(password);
      }else{
        Swal.fire(`La contraseña no coincide`);
      }
    }else{
      Swal.fire(`Contraseña no válida`);
    }
  }

  checkDate() {
    const date = new Date();
    if(date < new Date(this.changeForm.get('birthDate')?.value)){
      this.changeForm.get('birthDate')?.setValue(date.toISOString().split('T')[0]);
    }
  }

  private  async updatePassword(password: any) {

    const data = {
      ...this.userService.userActive,
      password: password
    }

   await this.userService.updateSameUser(data).subscribe({
      next: (resp:any )=> {
        const user = resp.data;
        user.password = resp.password;
        this.userService.userActive = user;
        Swal.fire('Actualizado!', resp.msg, 'success')
      },
      error: err => {
        Swal.fire('Cambios no guardados', err.msg, 'info')
      }
    })
  }
}
