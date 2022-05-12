import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import { ModalimgComponent } from './modalimg/modalimg.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ModalimgComponent
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
    ModalimgComponent
  ]
})
export class ComponentsModule { }
