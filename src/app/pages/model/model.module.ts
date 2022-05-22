import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user/user.component";
import {ComponentsModule} from "../../components/components.module";
import {BreedComponent} from "./breed/breed.component";
import {PromotionComponent} from "./promotion/promotion.component";



@NgModule({
  declarations: [
    UserComponent,
    BreedComponent,
    PromotionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    UserComponent,
    BreedComponent,
    PromotionComponent
  ]
})
export class ModelModule { }
