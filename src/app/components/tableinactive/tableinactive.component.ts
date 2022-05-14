import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableInterface} from "../../models/interfaces/interfacesForms.interface";

@Component({
  selector: 'app-tableinactive',
  templateUrl: './tableinactive.component.html',
  styleUrls: ['./tableinactive.component.css']
})
export class TableinactiveComponent{

  @Input() group:TableInterface[] = [];
  @Input() text: string = '';
  @Output() sendRequest = new EventEmitter<any>();
  constructor() { }

  active(item: any) {
    this.sendRequest.emit(item);
  }
}
