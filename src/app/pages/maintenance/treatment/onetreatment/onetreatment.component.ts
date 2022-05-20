import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Treatment} from "../../../../models/models/treatment.model";
import {TreatmentService} from "../../../../services/models/treatment.service";

@Component({
  selector: 'app-onetreatment',
  templateUrl: './onetreatment.component.html',
  styleUrls: ['./onetreatment.component.css']
})
export class OnetreatmentComponent implements OnDestroy, OnInit{

  private _treatment: Treatment | undefined;
  private _waiting = false;
  private _new = false;
  private _serviceTreatment: Subscription | undefined;
  private _id: string = '';
  private _pet: any;

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get treatment():Treatment{
    return this._treatment!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private treatmentService: TreatmentService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {

    this._changeForm = this.fb.group({
      id: [''],
      name: ['',[Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      startDate: [Date, [Validators.required]],
      finishDate: [Date]
    });
  }

  ngOnInit() {
    this.getTreatment()
  }

  async getTreatment(){
    this._id = this.activatedRoute.snapshot.params['id'];
    if(this._id !== 'new'){
      this._waiting = true;
      this._serviceTreatment = await this.treatmentService.getOneTreatment(this._id)
        .subscribe({
          next: resp => {
            this._treatment = resp.data;
            if(!this._treatment) this.route.navigateByUrl('main');
            this.updateForm();
          },
          error: err => {Swal.fire('Error', err.error.msg, 'error');
            this.route.navigateByUrl('main');}
        });
    }else{
      this._new = true;
      this.updateForm();
    }
  }

  updateForm(){
    if(!this._new){
      if(this._treatment){
        this._changeForm.get('id')!.setValue(this._treatment.id);
        this._changeForm.get('name')!.setValue(this._treatment.name);
        this._changeForm.get('description')!.setValue(this._treatment.description);
        const dateStart = this._treatment.startDate.toString().split('T')[0];
        const dateFinish = (this._treatment.finishDate)?
          this._treatment.finishDate.toString().split('T')[0] :
          new Date().toString().split(('T')[0]);
        this._changeForm.get('startDate')!.setValue(dateStart);
        this._changeForm.get('finishDate')!.setValue(dateFinish);
      }
      this._waiting = false;
    }else{
      const date = new Date().toISOString().split('T')[0];
      this._changeForm.get('startDate')!.setValue(date);
      this._changeForm.get('finishDate')!.setValue(date);
      this._pet = this.treatmentService.data.pet;
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

  private async _confirmSave(){
    this._formSubmitted = true;

    if(!this._changeForm.valid){
      return;
    }

    this._waiting = true;

    const pet = this.treatmentService.data.pet;

    console.log(this.treatmentService.data)
    const data = {
      ...this._changeForm.value,
      idPet: pet.id
    }

    if(!this._new){
      this.treatmentService.updateTreatment(data).subscribe({
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
      await this.treatmentService.createTreatment(data).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
          this._id = resp.data.id;
          this._treatment = resp.data;
          Swal.fire('Creado!', resp.msg, 'success');
        },
        error: err => {
          this._waiting = false;
          Swal.fire('Cambios no guardados', err.error.msg, 'info')
        },
        complete: () => {
          this.back()
        }
      });
    }

  }

  back() {
    if(!this._new){
      this.route.navigateByUrl('/main/treatments');
    }else{
      if(!this._treatment){
        this.route.navigateByUrl('/main/treatments');
      }
      this.treatmentService.treatment = this._treatment;
      this.route.navigateByUrl('/main/queries/newTemp');
    }
  }

  fieldNoValid(name: string) {
    return this._changeForm.get(name)!.invalid && this._formSubmitted;
  }

  ngOnDestroy(){
    if(this._serviceTreatment){
      this._serviceTreatment.unsubscribe();
    }
  }

  checkDate(input: string) {
    const date = new Date();
    if(new Date(this.changeForm.get('startDate')?.value) >
      new Date(this.changeForm.get('finishDate')?.value)){
      this.changeForm.get('finishDate')?.setValue(new Date(this.changeForm.get('startDate')?.value)
        .toISOString().split('T')[0]);
    }
    if(input === 'finish'){
      if(date > new Date(this.changeForm.get('finishDate')?.value)){
        this.changeForm.get('finishDate')?.setValue(date.toISOString().split('T')[0]);
      }
    }else{
      if(date > new Date(this.changeForm.get('startDate')?.value)){
        this.changeForm.get('startDate')?.setValue(date.toISOString().split('T')[0]);
      }
    }
  }
}
