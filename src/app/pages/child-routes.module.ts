import { NgModule } from '@angular/core';

import {MainComponent} from "./main/main.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {ProfileComponent} from "./profile/profile.component";
import {AlluserComponent} from "./maintenance/user/alluser/alluser.component";
import {OneuserComponent} from "./maintenance/user/oneuser/oneuser.component";
import {SearchComponent} from "./search/search.component";
import {RouterModule, Routes} from "@angular/router";

const childRoutes: Routes = [
  {path: '', component: MainComponent, data: {tittle : 'Principal'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {tittle : 'Configurador'}},
  {path: 'profile', component: ProfileComponent, data: {tittle : 'Perfil'}},
  {path: 'search/:value', component: SearchComponent, data: {tittle : 'Búsqueda'}},

  //Información
  {path: 'users', component: AlluserComponent, data: {tittle : 'Usuarios'}},
  {path: 'user/:id', component: OneuserComponent, data: {tittle : 'Usuario'}},
];


@NgModule({
  imports: [
    RouterModule.forChild( childRoutes )
  ],
  exports: [
    RouterModule
  ]
})
export class ChildRoutesModule { }
