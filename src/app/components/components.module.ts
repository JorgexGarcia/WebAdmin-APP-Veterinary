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
import { CalendarComponent } from './calendar/calendar.component';


import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TableComponent } from './table/table.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ModalimgComponent,
    LoadingComponent,
    TableinactiveComponent,
    CalendarComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FullCalendarModule,
    NgxChartsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
    exports: [
        BreadcrumbsComponent,
        SidebarComponent,
        HeaderComponent,
        ModalimgComponent,
        LoadingComponent,
        TableinactiveComponent,
        CalendarComponent,
        TableComponent
    ]
})
export class ComponentsModule { }
