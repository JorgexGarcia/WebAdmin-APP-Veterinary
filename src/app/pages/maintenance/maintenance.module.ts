import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlluserComponent} from "./user/alluser/alluser.component";
import {OneuserComponent} from "./user/oneuser/oneuser.component";
import {AllbreedComponent} from "./breed/allbreed/allbreed.component";
import {OnebreedComponent} from "./breed/onebreed/onebreed.component";
import {AllpromotionComponent} from "./promotion/allpromotion/allpromotion.component";
import {OnepromotionComponent} from "./promotion/onepromotion/onepromotion.component";
import {AllproductComponent} from "./product/allproduct/allproduct.component";
import {OneproductComponent} from "./product/oneproduct/oneproduct.component";
import {OneserviceComponent} from "./service/oneservice/oneservice.component";
import {AllserviceComponent} from "./service/allservice/allservice.component";
import {AllaidComponent} from "./aid/allaid/allaid.component";
import {OneaidComponent} from "./aid/oneaid/oneaid.component";
import {AllpetComponent} from "./pet/allpet/allpet.component";
import {OnepetComponent} from "./pet/onepet/onepet.component";
import {AlltreatmentComponent} from "./treatment/alltreatment/alltreatment.component";
import {OnetreatmentComponent} from "./treatment/onetreatment/onetreatment.component";
import {AllqueriesComponent} from "./queries/allqueries/allqueries.component";
import {OnequeriesComponent} from "./queries/onequeries/onequeries.component";
import {ComponentsModule} from "../../components/components.module";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AlluserComponent,
    OneuserComponent,
    AllbreedComponent,
    OnebreedComponent,
    AllpromotionComponent,
    OnepromotionComponent,
    AllproductComponent,
    OneproductComponent,
    OneserviceComponent,
    AllserviceComponent,
    AllaidComponent,
    OneaidComponent,
    AllpetComponent,
    OnepetComponent,
    AlltreatmentComponent,
    OnetreatmentComponent,
    AllqueriesComponent,
    OnequeriesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AlluserComponent,
    OneuserComponent,
    AllbreedComponent,
    OnebreedComponent,
    AllpromotionComponent,
    OnepromotionComponent,
    AllproductComponent,
    OneproductComponent,
    OneserviceComponent,
    AllserviceComponent,
    AllaidComponent,
    OneaidComponent,
    AllpetComponent,
    OnepetComponent,
    AlltreatmentComponent,
    OnetreatmentComponent,
    AllqueriesComponent,
    OnequeriesComponent
  ]
})
export class MaintenanceModule { }
