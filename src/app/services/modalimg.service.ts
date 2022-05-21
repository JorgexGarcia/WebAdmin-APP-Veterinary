import {Injectable, OnDestroy} from '@angular/core';
import {UserService} from "./models/user.service";
import {Router} from "@angular/router";
import {delay, Subscription} from "rxjs";
import {PromotionService} from "./models/promotion.service";
import {ProductService} from "./models/product.service";
import {AidService} from "./models/aid.service";
import {PetService} from "./models/pet.service";
import {QueriesService} from "./models/queries.service";

@Injectable({
  providedIn: 'root'
})

export class ModalimgService implements OnDestroy{

  private _hiddenModal: boolean = true;
  private _type: 'user' | 'aids' | 'queries' | 'promotion' | 'product' | 'pet' | undefined;
  private _id: string = '';
  private _img: string = '';
  private _subscription: Subscription | undefined;

  get img(){
    return this._img;
  }

  get id(){
    return this._id;
  }

  get type(){
    return this._type;
  }

  get hiddenModal(){
    return this._hiddenModal;
  }

  constructor(private userService: UserService,
              private promotionService: PromotionService,
              private productService: ProductService,
              private aidService: AidService,
              private petService: PetService,
              private querieService: QueriesService,
              private router: Router) { }

  async openModal(type:  'user' | 'aids' | 'queries' | 'promotion' | 'product' | 'pet',
            id: string){
    this._type = type;
    this._id = id;
    switch (this._type){
      case 'user':
        this._subscription = await this.userService.getOneUser(id).pipe(
          delay(400)
        ).subscribe({
          next: resp => {
            this._img = resp.data.img.url;
            this._hiddenModal = false;
          }
        })
        break;
      case 'promotion':
        this._subscription = await this.promotionService.getOnePromotion(id).pipe(
          delay(400)
        ).subscribe({
          next: resp => {
            this._img = resp.data.img.url;
            this._hiddenModal = false;
          }
        })
        break;
      case 'product':
        this._subscription = await this.productService.getOneProduct(id).pipe(
          delay(400)
        ).subscribe({
          next: resp => {
            this._img = resp.data.img.url;
            this._hiddenModal = false;
          }
        })
        break;
      case 'aids':
        this._subscription = await this.aidService.getOneAid(id).pipe(
          delay(400)
        ).subscribe({
          next: resp => {
            this._img = resp.data.img.url;
            this._hiddenModal = false;
          }
        })
        break;
      case 'pet':
        this._subscription = await this.petService.getOnePet(id).pipe(
          delay(400)
        ).subscribe({
          next: resp => {
            this._img = resp.data.img.url;
            this._hiddenModal = false;
          }
        })
        break;
      case 'queries':
        this._subscription = await this.querieService.getOneQueries(id).pipe(
          delay(400)
        ).subscribe({
          next: _ => {
            this._hiddenModal = false;
          }
        })
        break;
    }
  }

  closeModal(){
    if(this._type === 'queries'){
      this.router.navigateByUrl(`main/queries`);
      this._hiddenModal = true;
    }else{
      if(this.userService.userActive.id !== this._id){
        this.router.navigateByUrl(`main/${this._type}/${this._id}`)
      }
      this._hiddenModal = true;
    }


  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe()
  }
}
