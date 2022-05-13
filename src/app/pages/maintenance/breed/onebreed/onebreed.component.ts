import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Breed} from "../../../../models/models/breed.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BreedService} from "../../../../services/models/breed.service";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-onebreed',
  templateUrl: './onebreed.component.html',
  styleUrls: ['./onebreed.component.css']
})
export class OnebreedComponent implements OnDestroy {

  private _breed: Breed | undefined;
  private _waiting = false;
  private _new = false;
  private _serviceBreed: Subscription | undefined;

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get breed():Breed{
    return this._breed!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private breedService: BreedService,
              private route: Router,
              private activatedRoute: ActivatedRoute,) {

    this._changeForm = this.fb.group({
      id: [''],
      name: ['',[Validators.required, Validators.minLength(5)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
      problems: [''],
      features: ['']
    });
    this.getBreed();
  }

  async getBreed(){
    const id = this.activatedRoute.snapshot.params['id'];
    if(id !== 'new'){
      this._waiting = true;
      this._serviceBreed = await this.breedService.getOneBreed(id)
        .subscribe({
          next: resp => {
            this._breed = resp.data;
            if(!this._breed) this.route.navigateByUrl('main');
            this.updateForm();
          },
          error: err => {Swal.fire('Error', err.error.msg, 'error');
          this.route.navigateByUrl('main');}
        });
    }else{
      this._new = true;
    }
  }

  updateForm(){
    if(!this._new){
      if(this._breed){
        this._changeForm.get('id')!.setValue(this._breed.id);
        this._changeForm.get('name')!.setValue(this._breed.name);
        this._changeForm.get('type')!.setValue(this._breed.type);
        this._changeForm.get('problems')!.setValue(this._breed.problems);
        this._changeForm.get('features')!.setValue(this._breed.features);
      }
      this._waiting = false;
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
      this.breedService.updateBreed(this._changeForm.value).subscribe({
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
      this.breedService.createBreed(this._changeForm.value).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
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

  back() {
    this.route.navigateByUrl('/main/breeds');
  }

  fieldNoValid(name: string) {
    return this._changeForm.get(name)!.invalid && this._formSubmitted;
  }

  ngOnDestroy(){
    if(this._serviceBreed){
      this._serviceBreed.unsubscribe();
    }
  }
}
