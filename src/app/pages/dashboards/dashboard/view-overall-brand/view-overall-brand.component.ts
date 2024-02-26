import { Component } from '@angular/core';
import { ViewOverallSalesComponent } from '../view-overall-sales/view-overall-sales.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive } from 'ng-apexcharts';

interface sideBarOption {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: any;
  labels: any;
};

@Component({
  selector: 'app-view-overall-brand',
  templateUrl: './view-overall-brand.component.html',
  styleUrls: ['./view-overall-brand.component.scss']
})
export class ViewOverallBrandComponent {
  public salesChart: sideBarOption

  constructor(public dialogRef: MatDialogRef<ViewOverallSalesComponent>) {
    console.log("testing")
    this.salesChart = {
      series: [5000, 4000, 3000, 2000, 1000],
      chart: {
        type: "pie",
        height: '300px',
        
        // events: {
        //   dataPointSelection: (event, chartContext, config) => {
        //     const selecteddate = pad(config.dataPointIndex + 1, 2);
        //     console.log(selecteddate);
        //     if (selecteddate as any == 1) {
        //       console.log(selecteddate, "true");
        //       const dialogRef = this.dialog.open(ViewOverallSalesComponent,
        //         { width: '60%', panelClass: 'my-dialog', });
        //     }
        //   }
        // }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      labels: ['Brandy', 'Whisky', 'Rum', 'Wine', 'Votka'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      fill: {
        colors: ['#ffff'],
      },
    } as sideBarOption;
  }
  ngOnInit() {
    console.log("testing")
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
