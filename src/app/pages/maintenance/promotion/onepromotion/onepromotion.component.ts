import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Promotion} from "../../../../models/models/promotion.model";
import {PromotionService} from "../../../../services/models/promotion.service";
import Swal from "sweetalert2";
import {ModalimgService} from "../../../../services/modalimg.service";

@Component({
  selector: 'app-onepromotion',
  templateUrl: './onepromotion.component.html',
  styleUrls: ['./onepromotion.component.css']
})
export class OnepromotionComponent implements OnDestroy{

  private _promotion: Promotion | undefined;
  private _waiting = false;
  private _new = false;
  private _servicePromotion: Subscription | undefined;
  private _id: string = '';

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get promotion():Promotion{
    return this._promotion!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private promotionService: PromotionService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalimgService) {

    this._changeForm = this.fb.group({
      id: [''],
      name: ['',[Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      startDate: [Date, [Validators.required]],
      finishDate: [Date, [Validators.required]]
    });
    this.getPromotion();
  }

  async getPromotion(){
    const id = this.activatedRoute.snapshot.params['id'];
    if(id !== 'new'){
      this._waiting = true;
      this._servicePromotion = await this.promotionService.getOnePromotion(id)
        .subscribe({
          next: resp => {
            this._promotion = resp.data;
            if(!this._promotion) this.route.navigateByUrl('main');
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
      if(this._promotion){
        this._changeForm.get('id')!.setValue(this._promotion.id);
        this._changeForm.get('name')!.setValue(this._promotion.name);
        this._changeForm.get('description')!.setValue(this._promotion.description);
        const dateStart = this._promotion.startDate.toString().split('T')[0];
        const dateFinish = this._promotion.finishDate.toString().split('T')[0];
        this._changeForm.get('startDate')!.setValue(dateStart);
        this._changeForm.get('finishDate')!.setValue(dateFinish);
      }
      this._waiting = false;
    }else{
      const date = new Date().toISOString().split('T')[0];
      this._changeForm.get('startDate')!.setValue(date);
      this._changeForm.get('finishDate')!.setValue(date);
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
      this.promotionService.updatePromotion(this._changeForm.value).subscribe({
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
      this.promotionService.createPromotion(this._changeForm.value).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
          this._id = resp.data.id;
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
    if(this._new && this._formSubmitted){
      this._new = false;
      this.route.navigateByUrl(`/main/promotion/${this._id}`);
    }else {
      this.route.navigateByUrl('/main/promotions');
    }
  }

  fieldNoValid(name: string) {
    return this._changeForm.get(name)!.invalid && this._formSubmitted;
  }

  ngOnDestroy(){
    if(this._servicePromotion){
      this._servicePromotion.unsubscribe();
    }
  }

  openModalImg() {
    if(this._promotion && this._promotion.img){
      this.modalService.openModal('promotion',
        this._promotion.id)
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
    }
  }
}
