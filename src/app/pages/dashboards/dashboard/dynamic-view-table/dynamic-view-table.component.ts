import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-view-table',
  templateUrl: './dynamic-view-table.component.html',
  styleUrls: ['./dynamic-view-table.component.scss']
})
export class DynamicViewTableComponent {
  products =[{
    name:"name",price:"testing",
    category:"testing",
    quantity:"testing"
  }]
}
