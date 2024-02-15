import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    TableModule,
  ],
  exports: [
    DynamicTableComponent
  ]
})
export class ComponentsModule { }
