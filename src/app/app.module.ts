import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import {AppRoutingModule} from "./app-routing.module";
import {PagesModule} from "./pages/pages.module";
import {AuthModule} from "./auth/auth.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HeaderService} from "./interceptors/header.service";

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
