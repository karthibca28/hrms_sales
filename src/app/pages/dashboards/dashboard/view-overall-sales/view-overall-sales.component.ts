import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive } from 'ng-apexcharts';
import { HomeComponent } from '../home/home.component';
import { pad } from 'lodash';
import { ViewOverallBrandComponent } from '../view-overall-brand/view-overall-brand.component';
import { ChartOptions, ChartType, ChartData } from 'chart.js/auto';

interface sideBarOption {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: any;
  labels: any;
};


@Component({
  selector: 'app-view-overall-sales',
  templateUrl: './view-overall-sales.component.html',
  styleUrls: ['./view-overall-sales.component.scss']
})
export class ViewOverallSalesComponent {
  public salesChart: sideBarOption
  dataFlag: boolean = false
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      //   yAxes: [{
      //   ticks: {
      //     callback: function(value: any) {
      //       return `${value} Cr`;
      //     }
      //   }
      // }]
      x: {
        stacked: true
      },
      y: {
        stacked: false,
        ticks: {
          callback: function(value, index, ticks) {
              return value + "Cr";
          }
      }

      }
    }

  };
  barChartLabels = ['Chennai', 'Coimbatore', 'Madurai', 'Thirchy', 'Salem'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartData = {
    datasets: [
      {
        data: [50, 33, 90, 70, 23], label: '2024',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        categoryPercentage: 0.6,
        barPercentage: 0.7,
      },
      {
        data: [45, 37, 60, 70, 46, 33], label: '2023',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        categoryPercentage: 1.2,
        barPercentage: 0.7,
      }
    ],
  };

  constructor(public dialog: MatDialog,) {
    this.salesChart = {} as sideBarOption
  }

  ngOnInit() {
    this.salesChart = {
      series: [5000, 4000, 3000, 2000, 1000],
      chart: {
        type: "donut",
        height: '300px',
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const selecteddate = pad(config.dataPointIndex + 1, 2);
            console.log(selecteddate);
            if (selecteddate as any == 1) {
              console.log(selecteddate, "true");
              const dialogRef = this.dialog.open(ViewOverallBrandComponent,
                { width: '60%', panelClass: 'my-dialog', });
            }
          }
        }
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


  closeDialog() {
    // this.dialogRef.close();
  }
}
