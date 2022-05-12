import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {AuthGuard} from "../guards/auth.guard";


const routes: Routes = [

  {
    path: 'main',
    component: PagesComponent, data : {tittle: 'Home'},
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
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
