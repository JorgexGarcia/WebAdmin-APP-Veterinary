import {Component, OnDestroy} from '@angular/core';
import {User} from "../../../../models/models/user.model";
import { forkJoin } from 'rxjs';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/models/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalimgService} from "../../../../services/modalimg.service";
import Swal from "sweetalert2";
import {BreedInterface, UserInterface} from "../../../../models/interfaces/interfacesModel.interface";
import {Pet} from "../../../../models/models/pet.model";
import {Breed} from "../../../../models/models/breed.model";
import {PetService} from "../../../../services/models/pet.service";
import {BreedService} from "../../../../services/models/breed.service";

@Component({
  selector: 'app-onepet',
  templateUrl: './onepet.component.html',
  styleUrls: ['./onepet.component.css']
})
export class OnepetComponent implements OnDestroy {

  private _pet: Pet | undefined;
  private _waiting = false;
  private _new = false;
  private _id: string = '';
  private _idUser: string = '';
  private _breedTemp: BreedInterface | undefined;
  public users: User[] = [];
  public breeds: Breed[] = [];
  private _serviceForkJoin: Subscription | undefined;

  get breed(){
    return this._breedTemp;
  }

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get pet():Pet{
    return this._pet!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private petService: PetService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalimgService,
              private userService: UserService,
              private breedService: BreedService) {

    this._changeForm = this.fb.group({
      id: [''],
      name: ['',[Validators.required, Validators.minLength(2)]],
      birthDate: [Date, [Validators.required]],
      sex: ['', [Validators.required, Validators.minLength(2)]],
      sterilized: [false],
      color: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
      createDate: [Date, [Validators.required]],
      breed: ['', [Validators.required]],
      chip: [''],
      passport: [''],
      chronic: [''],
      weight: [0],
      comment: ['']
    });
    this.getPet();
  }

  ngOnDestroy() {
    if(this._serviceForkJoin){
      this._serviceForkJoin.unsubscribe();
    }
  }

  private async _getData(){
    const observableServiceUser = await this.userService.getAllUsers();
    const observableServiceBreed = await this.breedService.getAllBreeds();

    this._serviceForkJoin = await forkJoin([observableServiceUser, observableServiceBreed])
      .subscribe({
        next: results => {
          this.users = results[0].data;
          this.breeds = results[1].data;
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error')
        }
      });
  }

  async getPet(){
    this._id = this.activatedRoute.snapshot.params['id'];

    this._getData()

    if(this._id === 'new'){
      this._new = true;
      this.updateForm();
    }else{
      this._waiting = true;
      await this.petService.getOnePet(this._id)
        .subscribe({
          next: resp => {
            this._pet = resp.data;
            if(!this._pet) this.route.navigateByUrl('main');
            if(this._pet){
              if(this._pet.idUser){
                this._idUser = this._pet.idUser.id;
              }
              this._breedTemp = this._pet.breed;
            }
            this.updateForm();
          },
          error: err => {Swal.fire('Error', err.error.msg, 'error');
            this.route.navigateByUrl('main');}
        });
    }
  }

  updateForm(){
    if(!this._new){
      if(this._pet){
        const date = this._pet.birthDate.toString().split('T')[0];
        const date2 = this._pet.createDate.toString().split('T')[0];
        this._changeForm.get('id')!.setValue(this._pet.id);
        this._changeForm.get('name')!.setValue(this._pet.name);
        this._changeForm.get('birthDate')!.setValue(date);
        this._changeForm.get('sex')!.setValue(this._pet.sex);
        this._changeForm.get('sterilized')!.setValue(this._pet.sterilized);
        this._changeForm.get('color')!.setValue(this._pet.color);
        this._changeForm.get('type')!.setValue(this._pet.type);
        this._changeForm.get('createDate')!.setValue(date2);
        this._changeForm.get('chip')!.setValue(this._pet.chip);
        this._changeForm.get('breed')!.setValue(this._pet.breed.name);
        this._changeForm.get('passport')!.setValue(this._pet.passport);
        this._changeForm.get('chronic')!.setValue(this._pet.chronic);
        this._changeForm.get('weight')!.setValue(this._pet.weight![this._pet.weight!.length -1]);
        this._changeForm.get('comment')!.setValue(this._pet.comment);
      }
      this._waiting = false;
    }else{
      const date = new Date().toISOString().split('T')[0];
      this._changeForm.get('birthDate')!.setValue(date);
      this._changeForm.get('createDate')!.setValue(date);
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
      if(this._changeForm.get('breed')!.invalid){
        Swal.fire('Faltan campos', 'Tienes que añadir una raza', 'info');
      }
      return;
    }

    this._waiting = true;

    let data = {
      ...this._changeForm.value,
      idUser: this._idUser,
      breed: this._breedTemp?.id,
    }

    if(!this._new){
      if(this._changeForm.get('weight')?.value != 0){
        const num: number[] = this._pet?.weight || [];
        if(num[0] == 0){
            num[0] = this._changeForm.get('weight')?.value;
        }else{
          num.push(this._changeForm.get('weight')?.value)
        }
        data = {
          ...data,
          weight: num
        }
      }
      this.petService.updatePet(data).subscribe({
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
      this.petService.createPet(data).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
          this._id = resp.data.id;
          this._pet = resp.data;
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
    this.modalService.openModal('pet',
      this._id)
  }

  checkDate() {
    const date = new Date();
    if(date < new Date(this.changeForm.get('birthDate')?.value)){
      this.changeForm.get('birthDate')?.setValue(date.toISOString().split('T')[0]);
    }
  }

  back() {
    if(this._new && this._formSubmitted){
      this._new = false;
      this.route.navigateByUrl(`/main/pet/${this._id}`);
    }else {
      this.route.navigateByUrl('/main/pets');
    }
  }

  addUser(item : UserInterface) {
    const data = {
      ...this._pet,
      idUser: item.id
    }
    this.petService.updatePet(data).subscribe({
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
  }

  addBreed(item : BreedInterface) {
    this._breedTemp = item;
    this._changeForm.get('breed')!.setValue(item.name);
  }
}

