import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})

export class DynamicTableComponent implements OnInit, OnChanges {
  cols: any[] = [];
  tableData: any[] = [];
  @Input() dynamaicDataForTable = {
    columns:[],
    records:[]
  }
  @Output() edit  = new EventEmitter();
  @Output() delete  = new EventEmitter();
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dynamaicDataForTable'].currentValue){
      this.cols = this.dynamaicDataForTable.columns;
      this.tableData = this.dynamaicDataForTable.records;
    }
  }
  constructor() { }

  ngOnInit(): void {
   
  }

  editRecord(data:any){ 
    this.edit.emit(data)
  }
  deleteRecord(data:any){ 
    this.delete.emit(data.id)
  }
  
  clear(table: Table) {
      table.clear();
  }

}
