import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PagesComponent} from "./pages.component";
import {MainComponent} from "./main/main.component";
import {ComponentsModule} from "../components/components.module";
import {AppRoutingModule} from "../app-routing.module";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AlluserComponent } from './maintenance/user/alluser/alluser.component';
import { OneuserComponent } from './maintenance/user/oneuser/oneuser.component';
import { SearchComponent } from './search/search.component';
import {AllbreedComponent} from "./maintenance/breed/allbreed/allbreed.component";
import {OnebreedComponent} from "./maintenance/breed/onebreed/onebreed.component";
import {AllpromotionComponent} from "./maintenance/promotion/allpromotion/allpromotion.component";
import {OnepromotionComponent} from "./maintenance/promotion/onepromotion/onepromotion.component";
import {AllproductComponent} from "./maintenance/product/allproduct/allproduct.component";
import {OneproductComponent} from "./maintenance/product/oneproduct/oneproduct.component";
import {OneserviceComponent} from "./maintenance/service/oneservice/oneservice.component";
import {AllserviceComponent} from "./maintenance/service/allservice/allservice.component";
import {AllaidComponent} from "./maintenance/aid/allaid/allaid.component";
import {OneaidComponent} from "./maintenance/aid/oneaid/oneaid.component";
import {AllpetComponent} from "./maintenance/pet/allpet/allpet.component";
import {OnepetComponent} from "./maintenance/pet/onepet/onepet.component";

@NgModule({
  declarations:[
    PagesComponent,
    MainComponent,
    AccountSettingsComponent,
    ProfileComponent,
    AlluserComponent,
    OneuserComponent,
    SearchComponent,
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
    OnepetComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    PagesComponent,
    MainComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule {}
