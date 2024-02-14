import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Counter
import { CountUpModule } from 'ngx-countup';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

// NG2 Search Filter
import { NgPipesModule } from 'ngx-pipes';

// File Uploads
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Component pages
import { CryptoRoutingModule } from './crypto-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { OrdersComponent } from './orders/orders.component';
import { WalletComponent } from './wallet/wallet.component';
import { IcoComponent } from './ico/ico.component';
import { KycComponent } from './kyc/kyc.component';

import {DatePipe} from '@angular/common';

// sorting
import{ NgbdOrdersSortableHeader } from './orders/orders-sortable.directive';
import { NgbdTransactionsSortableHeader } from './transactions/transactions-sortable.directive';
import{NgbdBuySellSortableHeader} from './buy-sell/buy-sell-sortable.directive';
import{NgbdWalletSortableHeader} from './wallet/wallet-sortable.directive'


// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


@NgModule({
  declarations: [
    TransactionsComponent,
    BuySellComponent,
    OrdersComponent,
    WalletComponent,
    IcoComponent,
    KycComponent,
    NgbdTransactionsSortableHeader,
    NgbdOrdersSortableHeader,
    NgbdBuySellSortableHeader,
    NgbdWalletSortableHeader
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbDropdownModule,
    CountUpModule,
    FlatpickrModule,
    SlickCarouselModule ,
    NgApexchartsModule,
    DropzoneModule,
    CryptoRoutingModule,
    SharedModule,
    NgPipesModule
  ],
  providers: [
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CryptoModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
 }
