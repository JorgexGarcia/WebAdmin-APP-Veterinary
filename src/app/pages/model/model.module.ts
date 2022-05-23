import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user/user.component";
import {ComponentsModule} from "../../components/components.module";
import {BreedComponent} from "./breed/breed.component";
import {PromotionComponent} from "./promotion/promotion.component";
import {ProductComponent} from "./product/product.component";
import {ServiceComponent} from "./service/service.component";
import {AidComponent} from "./aid/aid.component";
import {PetComponent} from "./pet/pet.component";

@NgModule({
  declarations: [
    UserComponent,
    BreedComponent,
    PromotionComponent,
    ProductComponent,
    ServiceComponent,
    AidComponent,
    PetComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    UserComponent,
    BreedComponent,
    PromotionComponent,
    ProductComponent,
    ServiceComponent,
    AidComponent,
    PetComponent
  ]
})
export class ModelModule { }
