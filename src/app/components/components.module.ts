import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import { ModalimgComponent } from './modalimg/modalimg.component';
import {FormsModule} from "@angular/forms";
import { LoadingComponent } from './loading/loading.component';
import { TableinactiveComponent } from './tableinactive/tableinactive.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ModalimgComponent,
    LoadingComponent,
    TableinactiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ModalimgComponent,
    LoadingComponent,
    TableinactiveComponent
  ]
})
export class ComponentsModule { }
