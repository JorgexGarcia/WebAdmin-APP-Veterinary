import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./pages/main/main.component";
import {LoginComponent} from "./auth/login/login.component";
import {NopagefoundComponent} from "./pages/nopagefound/nopagefound.component";
import {PagesComponent} from "./pages/pages.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'main', component: MainComponent},
    ]
  },

  {path: 'login', component: LoginComponent},

  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
