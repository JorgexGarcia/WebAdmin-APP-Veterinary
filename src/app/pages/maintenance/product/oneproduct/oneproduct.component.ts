import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalimgService} from "../../../../services/modalimg.service";
import Swal from "sweetalert2";
import {Product} from "../../../../models/models/product.model";
import {ProductService} from "../../../../services/models/product.service";

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.css']
})
export class OneproductComponent implements OnDestroy, OnInit{

  private _oldNumber:string = '0'

  private _product: Product | undefined;
  private _waiting = false;
  private _new = false;
  private _serviceProduct: Subscription | undefined;
  private _id: string = '';

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get product():Product{
    return this._product!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalimgService) {

    this._changeForm = this.fb.group({
      id: [''],
      name: ['',[Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      price: ['0.00 €', [Validators.required]],
      quantity: [0, [Validators.required]]
    });
  }

  ngOnInit() {
    this.getProduct()
  }

  async getProduct(){
    this._id = this.activatedRoute.snapshot.params['id'];
    if(this._id !== 'new'){
      this._waiting = true;
      this._serviceProduct = await this.productService.getOneProduct(this._id)
        .subscribe({
          next: resp => {
            this._product = resp.data;
            if(!this._product) this.route.navigateByUrl('main');
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
    if(!this._new) {
      if (this._product) {
        this._changeForm.get('id')!.setValue(this._product.id);
        this._changeForm.get('name')!.setValue(this._product.name);
        this._changeForm.get('description')!.setValue(this._product.description);
        const num = this._product.price.toFixed(2)
        this._changeForm.get('price')!.setValue(`${num} €`);
        this._changeForm.get('quantity')!.setValue(this._product.quantity);
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

    const priceText:string = this._changeForm.get('price')!.value;
    const parts = priceText.split('€');
    const priceNumber = parseFloat(parts[0]);
    const data = {
      ...this._changeForm.value,
      price: priceNumber,
    }

    if(!this._new){
      this.productService.updateProduct(data).subscribe({
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
      await this.productService.createProduct(data).subscribe({
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
      this.route.navigateByUrl(`/main/product/${this._id}`);
    }else {
      this.route.navigateByUrl('/main/products');
    }
  }

  fieldNoValid(name: string) {
    return this._changeForm.get(name)!.invalid && this._formSubmitted;
  }

  ngOnDestroy(){
    if(this._serviceProduct){
      this._serviceProduct.unsubscribe();
    }
  }

  openModalImg() {
    this.modalService.openModal('product',
      this._id)
  }

  /**
   * Método para colocar el símbolo del euro en el input
   */
  checkNumber(value: string) {
    if(value !== ''){
      const parts: string[] = value.split('€');
      const parts2: string[] = parts[0].split(' ');
      let text: string = '';
      parts2.forEach(s => text = text.concat(s));

      const num:number = parseFloat(text);
      const numText: string = num.toFixed(2)

      if(text.length - numText.length < 2){
        if(!isNaN(num)){
          this._oldNumber = numText;
          this._changeForm.get('price')?.setValue(`${numText} €`);
        }else {
          this._changeForm.get('price')?.setValue(`${this._oldNumber} €`);
        }
      }else{
        this._changeForm.get('price')?.setValue(`${this._oldNumber} €`);
      }
    }
  }
}

