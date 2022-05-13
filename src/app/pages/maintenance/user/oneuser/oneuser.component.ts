import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/models/user.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../models/models/user.model";
import {environment} from "../../../../../environments/environment";
import {ModalimgService} from "../../../../services/modalimg.service";

@Component({
  selector: 'app-oneuser',
  templateUrl: './oneuser.component.html',
  styleUrls: ['./oneuser.component.css']
})
export class OneuserComponent implements OnInit, OnDestroy {

  private _user: User | undefined;
  private _waiting = false;
  private _new = false;
  private _id: string = '';

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get user():User{
    return this._user!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;
  private _userActive: User;

  get userActive(){return this._userActive;}

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalimgService) {

    this._userActive = this.userService.userActive;

    this._changeForm = this.fb.group({
      id: [''],
      name: ['',[Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      birthDate: [Date, [Validators.required]],
      phone: [''],
      province: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      comment: [''],
      rol: [''],
      dni: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.getUser();
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {}

  async getUser(){
    const id = this.activatedRoute.snapshot.params['id'];
    if(id === 'new'){
      this._new = true;
      this.updateForm();
    }else{
      this._waiting = true;
      await this.userService.getOneUser(id)
        .subscribe({
          next: resp => {
            this._user = resp.data;
            this.updateForm();
          },
          error: err => Swal.fire('Error', err.error.msg, 'error')
        });
    }
  }

  updateForm(){
    if(!this._new){
      if(this._user){
        const date = this._user.birthDate.toString().split('T')[0];
        this._changeForm.get('id')!.setValue(this._user.id);
        this._changeForm.get('name')!.setValue(this._user.name);
        this._changeForm.get('lastName')!.setValue(this._user.lastName);
        this._changeForm.get('birthDate')!.setValue(date);
        this._changeForm.get('phone')!.setValue(this._user.phone);
        this._changeForm.get('province')!.setValue(this._user.province);
        this._changeForm.get('city')!.setValue(this._user.city);
        this._changeForm.get('address')!.setValue(this._user.address);
        this._changeForm.get('comment')!.setValue(this._user.comment);
        this._changeForm.get('rol')!.setValue(this._user.rol);
        this._changeForm.get('dni')!.setValue(this._user.dni);
        this._changeForm.get('email')!.setValue(this._user.email);
      }
      this._waiting = false;
    }else{
      const date = new Date().toISOString().split('T')[0];
      this._changeForm.get('birthDate')!.setValue(date);
      this._changeForm.get('rol')!.setValue('USER_ROLE');
    }
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

    this._waiting = true;

    if(!this._new){
      this.userService.updateUser(this._changeForm.value).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
          Swal.fire('Actualizado!', resp.msg, 'success');
          this.back();
        },
        error: err => {
          this._waiting = false;
          Swal.fire('Cambios no guardados', err.error.msg, 'info')
        }
      });
    }else{
      const data = {
        password: environment.new_password,
        ...this._changeForm.value
      }
      this.userService.createUser(data).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
          this._id = resp.data.id;
          this._user = resp.data;
          Swal.fire('Creado!', resp.msg, 'success');
          this.back();
        },
        error: err => {
          this._waiting = false;
          Swal.fire('Cambios no guardados', err.error.msg, 'info')
        }
      });
    }

  }

  fieldNoValid(field: string):boolean {
    return this._changeForm.get(field)!.invalid && this._formSubmitted;
  }

  openModalImg() {
    if(this._user && this._user.img){
      this.modalService.openModal('user',
        this._user.id)
    }
  }

  checkDate() {
    const date = new Date();
    if(date < new Date(this.changeForm.get('birthDate')?.value)){
      this.changeForm.get('birthDate')?.setValue(date.toISOString().split('T')[0]);
    }
  }

  back() {
    if(this._new){
      this._new = false;
      this.route.navigateByUrl(`/main/user/${this._id}`);
    }else {
      this.route.navigateByUrl('/main/users');
    }
  }

  password() {
    console.log(this._user)
      this._user!.password = environment.new_password;
      this.userService.updateUser(this._user!).subscribe({
        next: value => {
          Swal.fire('Actualizado!', value.msg, 'success');
          this.back();
        },
        error: err => {
         Swal.fire('Cambios no guardados', err.error.msg, 'info');
      }});
  }

  addPromotion() {

  }


}