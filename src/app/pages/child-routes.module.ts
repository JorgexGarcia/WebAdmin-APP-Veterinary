import { NgModule } from '@angular/core';

import {MainComponent} from "./main/main.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {ProfileComponent} from "./profile/profile.component";
import {AlluserComponent} from "./maintenance/user/alluser/alluser.component";
import {OneuserComponent} from "./maintenance/user/oneuser/oneuser.component";
import {SearchComponent} from "./search/search.component";
import {RouterModule, Routes} from "@angular/router";
import {AllbreedComponent} from "./maintenance/breed/allbreed/allbreed.component";
import {OnebreedComponent} from "./maintenance/breed/onebreed/onebreed.component";
import {AllpromotionComponent} from "./maintenance/promotion/allpromotion/allpromotion.component";
import {OnepromotionComponent} from "./maintenance/promotion/onepromotion/onepromotion.component";

const childRoutes: Routes = [
  {path: '', component: MainComponent, data: {tittle : 'Principal'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {tittle : 'Configurador'}},
  {path: 'profile', component: ProfileComponent, data: {tittle : 'Perfil'}},
  {path: 'search/:value', component: SearchComponent, data: {tittle : 'Búsqueda'}},

  //Información
  {path: 'users', component: AlluserComponent, data: {tittle : 'Usuarios'}},
  {path: 'breeds', component: AllbreedComponent, data: {tittle : 'Razas'}},
  {path: 'promotions', component: AllpromotionComponent, data: {tittle : 'Promociones'}},
  {path: 'user/:id', component: OneuserComponent, data: {tittle : 'Usuario'}},
  {path: 'breed/:id', component: OnebreedComponent, data: {tittle : 'Raza'}},
  {path: 'promotion/:id', component: OnepromotionComponent, data: {tittle : 'Promoción'}},
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
