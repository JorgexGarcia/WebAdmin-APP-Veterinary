import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PagesComponent} from "./pages.component";
import {MainComponent} from "./main/main.component";
import {ComponentsModule} from "../components/components.module";
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
  declarations:[
    PagesComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule
  ],
  exports:[
    PagesComponent,
    MainComponent
  ]
})
export class PagesModule {}
