import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { DynamicViewTableComponent } from './dashboard/dynamic-view-table/dynamic-view-table.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ViewOverallSalesComponent } from './dashboard/view-overall-sales/view-overall-sales.component';

const routes: Routes = [
  {
    path: "dynamic-view-table",
    component: DynamicViewTableComponent
  },
  {
    path: "dynamic-view-table/:selectedValueRegionWise",
    component: DynamicViewTableComponent
  },
  {
    path:"home",
    component:HomeComponent
  }
  ,
  {
    path:"view-overall-sales",
    component:ViewOverallSalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule { }
