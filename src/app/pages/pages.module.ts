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

@NgModule({
  declarations:[
    PagesComponent,
    MainComponent,
    AccountSettingsComponent,
    ProfileComponent,
    AlluserComponent,
    OneuserComponent,
    SearchComponent
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
