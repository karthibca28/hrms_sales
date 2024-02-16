import { NgModule } from '@angular/core';
import { CommonModule,NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CountUpModule } from 'ngx-countup';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule, NgbNavModule, NgbTypeaheadModule, NgbPaginationModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

//Module
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';

// Component
import { AnalyticsComponent } from './analytics/analytics.component';
import { CrmComponent } from './crm/crm.component';
import { CryptoComponent } from './crypto/crypto.component';
import { ProjectsComponent } from './projects/projects.component';
import { NftComponent } from './nft/nft.component';
import { JobComponent } from './job/job.component';
import { DynamicViewTableComponent } from './dashboard/dynamic-view-table/dynamic-view-table.component';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeComponent } from './dashboard/home/home.component';
import { IndianCurrencyPipe } from './indian-currency.pipe';

@NgModule({
  declarations: [
    AnalyticsComponent,
    CrmComponent,
    CryptoComponent,
    ProjectsComponent,
    NftComponent,
    JobComponent,
    DynamicViewTableComponent,
    HomeComponent,
    IndianCurrencyPipe
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    CountUpModule,
    NgbToastModule,
    LeafletModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    SlickCarouselModule,
    FlatpickrModule.forRoot(),
    DashboardsRoutingModule,
    SharedModule,
    WidgetModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgFor,
    NgMultiSelectDropDownModule.forRoot()
  ],
})
export class DashboardsModule { }
