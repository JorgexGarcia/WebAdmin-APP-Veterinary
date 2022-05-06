import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";
import {PagesRoutingModule} from "./pages/pages-routing.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";

const routes: Routes = [

  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
