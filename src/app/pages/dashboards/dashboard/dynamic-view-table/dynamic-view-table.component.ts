import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-dynamic-view-table',
  templateUrl: './dynamic-view-table.component.html',
  styleUrls: ['./dynamic-view-table.component.scss']
})
export class DynamicViewTableComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  loading: boolean = true;
  selectedValueRegionWise: any;
  products: any;
  columns: any;
  cols: any[] | undefined;
  globalSearch: any[] = ['srmName', 'imfsSalesValue', 'imfsSoldVolumeCases', 'beerSalesValue', 'beerSoldVolumeCases', 'totalSalesValue'];

  constructor(private route: ActivatedRoute, private service: FormService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedValueRegionWise = params['selectedValueRegionWise'];
      const type = params['type'];
      console.log(this.selectedValueRegionWise,type)
      if(type == "regions"){
      this.getList(this.selectedValueRegionWise);
    }
    });
  }

  getList(data: any) {
    this.service.getregionWiseSales(data).subscribe(
        (res: any) => {
            // console.log("Response", res);
            this.products = res.data;
            // this.columns = res.data.columns;
            this.cols = this.products.columns.map((col: { field: string, header: string }) => ({ field: col.field, header: col.header }));
            this.loading = false;
        },
        (error) => {
            console.error('Error fetching data:', error);
            this.loading = false; // Set loading to false even if there's an error
        }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  applyGlobalFilter(event: any) {
    const filterValue = event.target.value;
    this.dt1.filterGlobal(filterValue, 'contains');
  }

}
