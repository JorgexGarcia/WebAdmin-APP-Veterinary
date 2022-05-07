import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {MainComponent} from "./main/main.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {AuthGuard} from "../guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [

  {
    path: 'main',
    component: PagesComponent, data : {tittle: 'Home'},
    canActivate: [AuthGuard],
    children: [
      {path: '', component: MainComponent, data: {tittle : 'Principal'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {tittle : 'Configurador'}},
      {path: 'profile', component: ProfileComponent, data: {tittle : 'Perfil'}},
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}
