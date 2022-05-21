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
    CalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FullCalendarModule
  ],
    exports: [
        BreadcrumbsComponent,
        SidebarComponent,
        HeaderComponent,
        ModalimgComponent,
        LoadingComponent,
        TableinactiveComponent,
        CalendarComponent
    ]
})
export class ComponentsModule { }
