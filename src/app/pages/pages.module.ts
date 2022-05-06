import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PagesComponent} from "./pages.component";
import {MainComponent} from "./main/main.component";
import {ComponentsModule} from "../components/components.module";
import {AppRoutingModule} from "../app-routing.module";
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations:[
    PagesComponent,
    MainComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule
  ],
  exports:[
    PagesComponent,
    MainComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule {}
