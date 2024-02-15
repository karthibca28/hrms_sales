import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-dynamic-view-table',
  templateUrl: './dynamic-view-table.component.html',
  styleUrls: ['./dynamic-view-table.component.scss']
})
export class DynamicViewTableComponent implements OnInit {
  loading: boolean = true;
  regionWiseSales: any;
  products: any;
  columns: any;

  constructor(private route: ActivatedRoute, private service: FormService) {}

  ngOnInit() {
    this.regionWiseSales = this.route.snapshot.params['regionWiseSales'];
    this.getList(this.regionWiseSales);
  }

  getList(data: any) {
    this.service.getregionWiseSales(data).subscribe(
      (res: any) => {
        this.products = res.data.records;
        this.columns = res.data.columns;
        this.loading = false; // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false; // Set loading to false even if there's an error
      }
    );
  }
}
