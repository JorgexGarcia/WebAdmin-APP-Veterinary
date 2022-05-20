import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PagesComponent} from "./pages.component";
import {MainComponent} from "./main/main.component";
import {ComponentsModule} from "../components/components.module";
import {AppRoutingModule} from "../app-routing.module";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import {MaintenanceModule} from "./maintenance/maintenance.module";

@NgModule({
  declarations:[
    PagesComponent,
    MainComponent,
    AccountSettingsComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaintenanceModule
  ],
  exports:[
    PagesComponent,
    MainComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule {}
