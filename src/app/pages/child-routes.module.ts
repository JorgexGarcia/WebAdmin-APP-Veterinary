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
import {AllproductComponent} from "./maintenance/product/allproduct/allproduct.component";
import {OneproductComponent} from "./maintenance/product/oneproduct/oneproduct.component";
import {AllserviceComponent} from "./maintenance/service/allservice/allservice.component";
import {OneserviceComponent} from "./maintenance/service/oneservice/oneservice.component";
import {AllaidComponent} from "./maintenance/aid/allaid/allaid.component";
import {OneaidComponent} from "./maintenance/aid/oneaid/oneaid.component";
import {AllpetComponent} from "./maintenance/pet/allpet/allpet.component";
import {OnepetComponent} from "./maintenance/pet/onepet/onepet.component";
import {AlltreatmentComponent} from "./maintenance/treatment/alltreatment/alltreatment.component";
import {OnetreatmentComponent} from "./maintenance/treatment/onetreatment/onetreatment.component";
import {AllqueriesComponent} from "./maintenance/queries/allqueries/allqueries.component";
import {OnequeriesComponent} from "./maintenance/queries/onequeries/onequeries.component";
import {UserComponent} from "./model/user/user.component";
import {BreedComponent} from "./model/breed/breed.component";
import {PromotionComponent} from "./model/promotion/promotion.component";
import {ProductComponent} from "./model/product/product.component";
import {ServiceComponent} from "./model/service/service.component";
import {AidComponent} from "./model/aid/aid.component";
import {PetComponent} from "./model/pet/pet.component";
import {TreatmentComponent} from "./model/treatment/treatment.component";
import {QueriesComponent} from "./model/queries/queries.component";

const childRoutes: Routes = [
  {path: '', component: MainComponent, data: {tittle : 'Principal'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {tittle : 'Configurador'}},
  {path: 'profile', component: ProfileComponent, data: {tittle : 'Perfil'}},
  {path: 'search/:value', component: SearchComponent, data: {tittle : 'B??squeda'}},

  //Informaci??n ALL
  {path: 'users', component: AlluserComponent, data: {tittle : 'Usuarios'}},
  {path: 'breeds', component: AllbreedComponent, data: {tittle : 'Razas'}},
  {path: 'promotions', component: AllpromotionComponent, data: {tittle : 'Promociones'}},
  {path: 'products', component: AllproductComponent, data: {tittle : 'Productos'}},
  {path: 'services', component: AllserviceComponent, data: {tittle : 'Servicios'}},
  {path: 'aids', component: AllaidComponent, data: {tittle : 'Consejos'}},
  {path: 'pets', component: AllpetComponent, data: {tittle : 'Mascotas'}},
  {path: 'treatments', component: AlltreatmentComponent, data: {tittle : 'Tratamientos'}},
  {path: 'queries', component: AllqueriesComponent, data: {tittle : 'Consultas'}},

  //Informaci??n ONE
  {path: 'model/user/:id', component: UserComponent, data: {tittle : 'Usuario'}},
  {path: 'model/breed/:id', component: BreedComponent, data: {tittle : 'Raza'}},
  {path: 'model/promotion/:id', component: PromotionComponent, data: {tittle : 'Promoci??n'}},
  {path: 'model/product/:id', component: ProductComponent, data: {tittle : 'Producto'}},
  {path: 'model/service/:id', component: ServiceComponent, data: {tittle : 'Servicio'}},
  {path: 'model/aids/:id', component: AidComponent, data: {tittle : 'Consejo'}},
  {path: 'model/pet/:id', component: PetComponent, data: {tittle : 'Mascota'}},
  {path: 'model/treatment/:id', component: TreatmentComponent, data: {tittle : 'Tratamiento'}},
  {path: 'model/queries/:id', component: QueriesComponent, data: {tittle : 'Consulta'}},

  //Mantenimiento
  {path: 'user/:id', component: OneuserComponent, data: {tittle : 'Usuario'}},
  {path: 'breed/:id', component: OnebreedComponent, data: {tittle : 'Raza'}},
  {path: 'promotion/:id', component: OnepromotionComponent, data: {tittle : 'Promoci??n'}},
  {path: 'product/:id', component: OneproductComponent, data: {tittle : 'Producto'}},
  {path: 'service/:id', component: OneserviceComponent, data: {tittle : 'Servicio'}},
  {path: 'aids/:id', component: OneaidComponent, data: {tittle : 'Consejo'}},
  {path: 'pet/:id', component: OnepetComponent, data: {tittle : 'Mascota'}},
  {path: 'treatment/:id', component: OnetreatmentComponent, data: {tittle : 'Tratamiento'}},
  {path: 'queries/:id', component: OnequeriesComponent, data: {tittle : 'Consulta'}},
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
