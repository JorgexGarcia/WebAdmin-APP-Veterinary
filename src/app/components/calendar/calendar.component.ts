import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import {DateSelectArg, EventInput} from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import {CalendarService} from "../../services/calendar.service";
import dayGridPlugin from "@fullcalendar/daygrid";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {

  public events: EventInput[] = [];

  constructor(private service: CalendarService) { }

  ngOnInit(): void {
   this.getCalendar();
  }

  private async getCalendar() {
    await this.service.getData().pipe()
      .subscribe(resp => {
        this.events = resp;
        if(this.events.length >0){
          let calendarEl = document.getElementById('calendar');
          let calendar = new Calendar(calendarEl!,{
            height: 600,
            plugins: [dayGridPlugin],
            locale: esLocale,
            titleFormat: {year: 'numeric', month: 'long', day: 'numeric'},
            initialView: 'dayGridWeek',
            dayHeaderFormat: {weekday: 'long'},
            //
            weekends: true,
            selectable: true,
            selectMirror: true,
            select: this.createDate.bind(this),
            eventClick: this.clickEvent.bind(this),
            eventTimeFormat: {
              hour: 'numeric',
              minute: '2-digit',
              meridiem: 'short'
            },
            editable: true,
            events: this.events,
            eventDisplay: 'block',
          });
          calendar.render();
        }
      });
  }

  createDate(event: DateSelectArg){
    const calendarApi = event.view.calendar;
    calendarApi.unselect();
    this.service.createDate(event.startStr);
  }

  clickEvent(event: any){
    this.service.clickEvent(event.event._def);
  }
}
