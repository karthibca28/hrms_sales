import { Component } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive } from 'ng-apexcharts';

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


  constructor(){
    this.salesChart = {
      series: [5000,4000,3000,2000,1000],
      chart: {
        type: "donut",
        height: '300px'
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
      labels: ['Brandy', 'Whisky', 'Rum', 'Wine','Votka'],
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

}
