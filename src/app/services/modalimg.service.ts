import {Injectable, OnDestroy} from '@angular/core';
import {UserService} from "./models/user.service";
import {Router} from "@angular/router";
import {delay, Subscription} from "rxjs";
import {PromotionService} from "./models/promotion.service";

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
        console.log('b')
        this._subscription = await this.promotionService.getOnePromotion(id).pipe(
          delay(400)
        ).subscribe({
          next: resp => {
            this._img = resp.data.img.url;
            this._hiddenModal = false;
          }
        })
        break;
    }
  }

  closeModal(){
    if(this.userService.userActive.id !== this._id){
      switch (this._type){
        case 'user':
          this.router.navigateByUrl(`main/user/${this._id}`)
          break;
        case 'promotion':
          this.router.navigateByUrl(`main/promotion/${this._id}`)
          break;
      }
    }
    this._hiddenModal = true;
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe()
  }
}
