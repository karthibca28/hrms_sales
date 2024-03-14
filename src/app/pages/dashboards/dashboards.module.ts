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
import { NgSelectModule } from '@ng-select/ng-select';

//Module
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';

// Component
import { DynamicViewTableComponent } from './dashboard/dynamic-view-table/dynamic-view-table.component';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeComponent } from './dashboard/home/home.component';
import { IndianCurrencyPipe } from './indian-currency.pipe';
import { ViewOverallSalesComponent } from './dashboard/view-overall-sales/view-overall-sales.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewOverallBrandComponent } from './dashboard/view-overall-brand/view-overall-brand.component';
import { NgChartsModule } from 'ng2-charts';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    DynamicViewTableComponent,
    HomeComponent,
    IndianCurrencyPipe,
    ViewOverallSalesComponent,
    ViewOverallBrandComponent
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
    SharedModule,TooltipModule,
    WidgetModule,NgSelectModule,
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
    NgMultiSelectDropDownModule.forRoot(),
    MatDialogModule,
    NgChartsModule,
    
  ],
})
export class DashboardsModule { }
