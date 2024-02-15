import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexStroke,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexGrid,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { FormService } from 'src/app/shared/service/form.service';

interface sideBarOption {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
interface barChartOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
interface areaChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public areaChart: areaChart
  public salesChart: sideBarOption
  public barChart: barChartOption
  public barChartTop: barChartOption
  public barChartLeast: barChartOption
  public areaChartYearlySalesComparison :areaChart

  ngOnInit(): void {
    this.getDashboardData()
  }
  constructor(public service: FormService) {
    this.areaChart = {} as areaChart
    this.barChart ={} as barChartOption
    this.salesChart ={} as sideBarOption
    this.areaChartYearlySalesComparison ={} as areaChart
    this.barChartTop = {} as barChartOption
    this.barChartLeast ={} as barChartOption
  }
  getDashboardData() {
    this.service.getDashBoard().subscribe((res: any) => {
      console.log('>>>', res.data)
      this.areaChart = {
        series: res.data.charts.yearlyCummulativeComparison.series,
        chart: {
          height: 350,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: res.data.
        charts.yearlyCummulativeComparison.xaxis,
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      };
      this.areaChartYearlySalesComparison = {
        series: res.data.charts.
        yearlySalesComparison
        .series,
        chart: {
          height: 350,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: res.data.
        charts.
        yearlySalesComparison
        .xaxis,
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      };
      this.barChart = {
        series:res.data.charts.comparisonBetweenDate
        .series,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            // endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: res.data.
        charts.comparisonBetweenDate
        .xaxis,
        yaxis: {
          title: {
            text: "$ (thousands)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            }
          }
        }
      } as barChartOption
      this.salesChart = {
        series: res.data.charts.imfsAndBeerComparison.series,
        chart: {
          type: "donut"
        },
        labels: res.data.charts.imfsAndBeerComparison.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
      this.barChartTop = {
        series:res.data.charts.top5DistrictBarChart.series,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            // endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: res.data.charts.top5DistrictBarChart.xaxis,
        yaxis: {
          title: {
            text: "$ (thousands)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            }
          }
        }
      } as barChartOption
      this.barChartLeast = {
        series:res.data.charts.leastPerformance.series,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            // endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: res.data.charts.leastPerformance.xaxis,
        yaxis: {
          title: {
            text: "$ (thousands)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            }
          }
        }
      } as barChartOption
    })
  }

}

