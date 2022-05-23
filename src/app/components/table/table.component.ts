import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  single: any[] = [
  ];

  public view: [number, number] = [350, 200];

  public showYAxis = true;
  public gradient = false;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public yAxisLabel = 'Kilos';


  @Input() dataTable: any;

  constructor() {

  }

  ngOnInit(): void {
    let autoNum: number = 1;
    this.dataTable.map((num:number) => {
      this.single.push(
      {
        "name": `Posición ${autoNum}`,
        "value": num
      });
      autoNum ++;
    });
  }

}
