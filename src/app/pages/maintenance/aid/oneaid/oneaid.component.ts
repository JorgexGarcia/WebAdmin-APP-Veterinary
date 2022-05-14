import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalimgService} from "../../../../services/modalimg.service";
import Swal from "sweetalert2";
import {Aids} from "../../../../models/models/aids.model";
import {AidService} from "../../../../services/models/aid.service";

@Component({
  selector: 'app-oneaid',
  templateUrl: './oneaid.component.html',
  styleUrls: ['./oneaid.component.css']
})
export class OneaidComponent implements OnDestroy, OnInit{

  private _aid: Aids | undefined;
  private _waiting = false;
  private _new = false;
  private _serviceAid: Subscription | undefined;
  private _id: string = '';

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get aid():Aids{
    return this._aid!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private aidService: AidService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalimgService) {

    this._changeForm = this.fb.group({
      id: [''],
      name: ['',[Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    this.getAid()
  }

  async getAid(){
    this._id = this.activatedRoute.snapshot.params['id'];
    if(this._id !== 'new'){
      this._waiting = true;
      this._serviceAid = await this.aidService.getOneAid(this._id)
        .subscribe({
          next: resp => {
            this._aid = resp.data;
            if(!this._aid) this.route.navigateByUrl('main');
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
      if(this._aid){
        this._changeForm.get('id')!.setValue(this._aid.id);
        this._changeForm.get('name')!.setValue(this._aid.name);
        this._changeForm.get('description')!.setValue(this._aid.description);
        this._changeForm.get('content')!.setValue(this._aid.content);
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

  private async _confirmSave(){
    this._formSubmitted = true;

    if(!this._changeForm.valid){
      return;
    }

    this._waiting = true;

    if(!this._new){
      this.aidService.updateAid(this._changeForm.value).subscribe({
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
      await this.aidService.createAid(this._changeForm.value).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
          this._id = resp.data.id;
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
    if(this._new && this._formSubmitted){
      this._new = false;
      this.route.navigateByUrl(`/main/aids/${this._id}`);
    }else {
      this.route.navigateByUrl('/main/aids');
    }
  }

  fieldNoValid(name: string) {
    return this._changeForm.get(name)!.invalid && this._formSubmitted;
  }

  ngOnDestroy(){
    if(this._serviceAid){
      this._serviceAid.unsubscribe();
    }
  }

  openModalImg() {
    this.modalService.openModal('aids',
      this._id)
  }

}
