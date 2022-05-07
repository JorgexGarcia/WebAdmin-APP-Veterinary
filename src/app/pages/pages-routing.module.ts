import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {MainComponent} from "./main/main.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";

const routes: Routes = [

  {
    path: 'main',
    component: PagesComponent, data : {tittle: 'Home'},
    children: [
      {path: '', component: MainComponent, data: {tittle : 'Principal'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {tittle : 'Configurador'}},
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
