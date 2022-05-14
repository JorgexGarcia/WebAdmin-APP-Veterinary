import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Service} from "../../../../models/models/service.model";
import {ServiceService} from "../../../../services/models/service.service";

@Component({
  selector: 'app-oneservice',
  templateUrl: './oneservice.component.html',
  styleUrls: ['./oneservice.component.css']
})
export class OneserviceComponent implements OnDestroy {

  private _service: Service | undefined;
  private _waiting = false;
  private _new = false;
  private _serviceService: Subscription | undefined;

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get service():Service{
    return this._service!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private serviceService: ServiceService,
              private route: Router,
              private activatedRoute: ActivatedRoute,) {

    this._changeForm = this.fb.group({
      id: [''],
      name: ['',[Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]]
    });
    this.getService();
  }

  async getService(){
    const id = this.activatedRoute.snapshot.params['id'];
    if(id !== 'new'){
      this._waiting = true;
      this._serviceService = await this.serviceService.getOneService(id)
        .subscribe({
          next: resp => {
            this._service = resp.data;
            if(!this._service) this.route.navigateByUrl('main');
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
      if(this._service){
        this._changeForm.get('id')!.setValue(this._service.id);
        this._changeForm.get('name')!.setValue(this._service.name);
        this._changeForm.get('price')!.setValue(this._service.price);
        this._changeForm.get('description')!.setValue(this._service.description);
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
      this.serviceService.updateService(this._changeForm.value).subscribe({
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
      this.serviceService.createService(this._changeForm.value).subscribe({
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
    this.route.navigateByUrl('/main/services');
  }

  fieldNoValid(name: string) {
    return this._changeForm.get(name)!.invalid && this._formSubmitted;
  }

  ngOnDestroy(){
    if(this._serviceService){
      this._serviceService.unsubscribe();
    }
  }
}
