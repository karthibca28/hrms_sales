import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AnalyticsComponent } from "./analytics/analytics.component";
import { CrmComponent } from "./crm/crm.component";
import { CryptoComponent } from "./crypto/crypto.component";
import { ProjectsComponent } from "./projects/projects.component";
import { NftComponent } from "./nft/nft.component";
import { JobComponent } from './job/job.component';
import { DynamicViewTableComponent } from './dashboard/dynamic-view-table/dynamic-view-table.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ViewOverallSalesComponent } from './dashboard/view-overall-sales/view-overall-sales.component';

const routes: Routes = [
  {
    path: "analytics",
    component: AnalyticsComponent
  },
  {
    path: "dynamic-view-table",
    component: DynamicViewTableComponent
  },
  {
    path: "dynamic-view-table/:selectedValueRegionWise",
    component: DynamicViewTableComponent
  },
  {
    path: "crm",
    component: CrmComponent
  },
  {
    path: "crypto",
    component: CryptoComponent
  },
  {
    path: "projects",
    component: ProjectsComponent
  },
  {
    path: "nft",
    component: NftComponent
  },
  {
    path: "job",
    component: JobComponent
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
