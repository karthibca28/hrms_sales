import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from './toast-service';


import { circle, latLng, tileLayer } from 'leaflet';

import { BestSelling, TopSelling, RecentSelling, statData } from './data';
import { ChartType } from './dashboard.model';
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
  ApexGrid
} from "ng-apexcharts";
import { FormService } from 'src/app/shared/service/form.service';

interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  colors: string[]
  title: ApexTitleSubtitle;
};

interface sideBarOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  // subtitle: ApexTitleSubtitle;
};

interface BarChartOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
}

interface BarChartOption1 {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
}
interface lineChartOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
interface areaChartOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Ecommerce Component
 */
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;
  public sideBarChart: sideBarOption;
  public barChart: BarChartOption;
  public Barchart1: BarChartOption1
  public lineChart: lineChartOption;
  public areaChart: areaChartOption

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  analyticsChart!: ChartType;
  BestSelling: any;
  TopSelling: any;
  RecentSelling: any;
  SalesCategoryChart!: ChartType;
  statData!: any;
  totalInwardStocks = "992900510"
  totalSales = "19823479823"
  insuranceClaims = "23400"
  // Current Date
  currentDate: any;
  date: any[] | undefined;
  selectedDate: string | undefined;
  regionwiseDropdown:any

  constructor(public toastService: ToastService,public service:FormService) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.currentDate = { from: firstDay, to: lastDay }

    // this.Barchart1 = {
    //   series: [
    //     {
    //       name: "sales",
    //       data: [956.0887, 736.6534, 855.978, 904.3942, 868.7903],
    //     },
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar",
    //   },
    //   plotOptions: {
    //     bar: {
    //       dataLabels: {
    //         position: "top",
    //       },
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     formatter: function (val) {
    //       return val + "%";
    //     },
    //     offsetY: -20,
    //     style: {
    //       fontSize: "12px",
    //       colors: ["#304758"],
    //     },
    //   },
    //   xaxis: {
    //     categories: ["Chennai", "Coimbatore", "Madhurai", "Trichy", "Salem"],
    //     position: "bottom",
    //     labels: {},
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     crosshairs: {
    //       fill: {
    //         type: "gradient",
    //         gradient: {
    //           colorFrom: "#D8E3F0",
    //           colorTo: "#BED1E6",
    //           stops: [0, 100],
    //           opacityFrom: 0.4,
    //           opacityTo: 0.5,
    //         },
    //       },
    //     },
    //     tooltip: {
    //       enabled: true,
    //       offsetY: -35,
    //     },
    //   },
    //   fill: {
    //     type: "gradient",
    //     gradient: {
    //       shade: "light",
    //       type: "horizontal",
    //       shadeIntensity: 0.25,
    //       gradientToColors: undefined,
    //       inverseColors: true,
    //       opacityFrom: 1,
    //       opacityTo: 1,
    //       stops: [50, 0, 100, 100],
    //     },
    //   },
    //   yaxis: {
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     labels: {
    //       show: false,
    //       formatter: function (val) {
    //         return val + "%";
    //       },
    //     },
    //   },
    //   title: {
    //     offsetY: 320,
    //     align: "center",
    //     style: {
    //       color: "#444",
    //     },
    //   },
    //   tooltip: {
    //     enabled: true, // Add tooltip configuration as needed
    //   },
    //   stroke: {
    //     // Add stroke configuration as needed
    //   },
    // };
    

    this.barChart = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },

      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",

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
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
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
    };

    this.barChart={} as BarChartOption;
    this.Barchart1={} as BarChartOption1;
    this.lineChart={} as lineChartOption
    this.areaChart ={} as areaChartOption
    this.sideBarChart ={} as sideBarOption

    this.chartOptions = {
      series: [
        {
          name: "IMFS",
          data: [44, 55, 41, 67, 22]
        },
        {
          name: "Beer",
          data: [44, 55, 41, 67, 22]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      xaxis: {
        categories: [
          "Chennai",
          "Coimbatore",
          "Madurai",
          "Salem",
          "Trichy"
        ]
      },
      title: {
        text: "",
        align: "left",
        // floating: true
      },
      fill: {
        opacity: 1
      },
      colors: [
        "#2E65FE",
        "#17C6FF",
        "#F13536",
      ],
      legend: {
        position: "right",
        offsetX: 0,
        offsetY: 10
      }
    } as ChartOptions;
    this.sideBarChart = {
      series: [
        {
          data: [400, 430, 448, 470, 540]
        }
      ],
      chart: {
        type: "bar",
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          },

        }
      },
      colors: [
        "#E14D57",
        "#965994",
        "#EC932F",
        "#71B37C",
        "#5290EA",
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 2,
        colors: ["#fff"]
      },
      xaxis: {
        categories: [
          "Ambattur 1 : 45 Crores",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
        ]
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: "",
        align: "left",
        // floating: true
      },
      // subtitle: {
      //   text: "Category Names as DataLabels inside bars",
      //   align: "center"
      // },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return "";
            }
          }
        }
      }
    };
    this.lineChart = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };
    this.areaChart = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
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
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    
    
  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.getDashboardData()
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Dashboard', active: true }
    ];

    this.date = [
      { name: '2019', },
      { name: '2020', },
      { name: '2021', },
      { name: '2022', },
      { name: '2023', },
      { name: '2024', },
    ];

    if (localStorage.getItem('toast')) {
      this.toastService.show('Logged in Successfull.', { classname: 'bg-success text-center text-white', delay: 5000 });
      localStorage.removeItem('toast');
    }

    /**
    * Fetches the data
    */
    this.fetchData();

    // Chart Color Data Get Function
    this._analyticsChart('["--vz-success", "--vz-primary", "--vz-danger"]');
    this._SalesCategoryChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');

  }
  filterRegionWise(data:any){
    console.log(data)
    this.service.getFilterDashBoard().subscribe((res:any)=>{
      console.log(res)
      // this.barChart = {
      //   "series": res.data.charts.regionWiseBarChart.series,
      //   chart: {
      //     height: 350,
      //     type: "bar"
      //   },
      //   plotOptions: {
      //     bar: {
      //       horizontal: false,
      //       columnWidth: "55%",
  
      //     }
      //   },
      //   dataLabels: {
      //     enabled: false
      //   },
      //   stroke: {
      //     show: true,
      //     width: 2,
      //     colors: ["transparent"]
      //   },
      //   xaxis: {
      //     "categories": res.data.charts.regionWiseBarChart.xaxis.categories,
      //   },
      //   yaxis: {
      //     title: {
      //       // text: "$ (thousands)"
      //     }
      //   },
      //   fill: {
      //     opacity: 1
      //   },
      //   tooltip: {
      //     y: {
      //       formatter: function (val) {
      //         return "" + val;
      //       }
      //     }
      //   }
      // };
    })
  }
  getDashboardData(){
    this.service.getDashBoard().subscribe((res:any)=>{
      console.log('>>>', res.data)
      this.regionwiseDropdown = res.data.parameters.regionWiseBarChart.years
      this.barChart = {
        "series": res.data.charts.regionWiseBarChart.series,
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
  
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
        xaxis: {
          "categories": res.data.charts.regionWiseBarChart.xaxis.categories,
        },
        yaxis: {
          title: {
            // text: "$ (thousands)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val;
            }
          }
        }
      };
      this.Barchart1 = {
        "series": res.data.charts.top5DistrictBarChart.series,
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
  
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["#00FF00"]
        },
        xaxis: {
          "categories": res.data.charts.top5DistrictBarChart.xaxis.categories,
        },
        yaxis: {
          title: {
            // text: "$ (thousands)"
          }
        },
        fill: {
          colors: ["#00E396"],
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val;
            }
          }
        }
      };
  this.lineChart ={
    "series": res.data.charts.last12MonthChart.series,
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        "categories": res.data.charts.last12MonthChart.xaxis.categories,
      }
    }
    this.areaChart = {
      "series": res.data.charts.yearlySalesComparison.series,
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
      xaxis: {
        "categories": res.data.charts.yearlySalesComparison.xaxis.categories,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    this.sideBarChart = {
      "series": res.data.charts.leastPerformance.series,
      chart: {
        type: "bar",
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          },

        }
      },
      colors: [
        "#E14D57",
        "#965994",
        "#EC932F",
        "#71B37C",
        "#5290EA",
        "#8F13FD",
        "#EC932F",
        "#00E396"
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 2,
        colors: ["#fff"]
      },
      xaxis: {
        "categories": res.data.charts.leastPerformance.xaxis.categories,
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        // text: "Top Performing Depot",
        align: "left",
        // floating: true
      },
      // subtitle: {
      //   text: "Category Names as DataLabels inside bars",
      //   align: "center"
      // },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return "";
            }
          }
        }
      }
    };
    // colors = this.getChartColorsArray(colors);
    this.SalesCategoryChart = {
      "series": res.data.charts.imfsAndBeerComparison.series,
      labels: res.data.charts.imfsAndBeerComparison.labels,
      chart: {
        height: 333,
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      stroke: {
        show: false
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      title: {
        text: "",
        align: "left",
        // floating: true
      },
      colors:  [
        "#E14D57",
        "#965994",
        "#EC932F",
        "#71B37C",
        "#5290EA",
        "#8F13FD",
        "#EC932F",
        "#00E396"
      ],
    };
    })
  }

  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

  /**
 * Sales Analytics Chart
 */
  setrevenuevalue(value: any) {
    if (value == 'all') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }]
    }
    if (value == '1M') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [24, 75, 16, 98, 19, 41, 52, 34, 28, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [99.25, 28.58, 98.74, 12.87, 107.54, 94.03, 11.24, 48.57, 22.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [28, 22, 17, 27, 21, 11, 5, 9, 17, 29, 12, 15]
      }]
    }
    if (value == '6M') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [34, 75, 66, 78, 29, 41, 32, 44, 58, 52, 43, 77]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [109.25, 48.58, 38.74, 57.87, 77.54, 84.03, 31.24, 18.57, 92.57, 42.36, 48.51, 56.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [12, 22, 17, 27, 1, 51, 5, 9, 7, 29, 12, 35]
      }]
    }
    if (value == '1Y') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }]
    }
  }

  private _analyticsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.analyticsChart = {
      chart: {
        height: 370,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "straight",
        dashArray: [0, 0, 8],
        width: [2, 0, 2.2],
      },
      colors: colors,
      series: [{
        name: 'Orders',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }],
      fill: {
        opacity: [0.1, 0.9, 1],
      },
      labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
      markers: {
        size: [0, 0, 0],
        strokeWidth: 2,
        hover: {
          size: 4,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: -2,
          bottom: 15,
          left: 10,
        },
      },
      legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: {
          width: 9,
          height: 9,
          radius: 6,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
          barHeight: "70%",
        },
      },
    };
  }

  /**
 *  Sales Category
 */
  private _SalesCategoryChart(colors: any) {
    // colors = this.getChartColorsArray(colors);
    // this.SalesCategoryChart = {
    //   series: [44, 55, 41, 17, 15],
    //   labels: ["Direct", "Social", "Email", "Other", "Referrals"],
    //   chart: {
    //     height: 333,
    //     type: "donut",
    //   },
    //   legend: {
    //     position: "bottom",
    //   },
    //   stroke: {
    //     show: false
    //   },
    //   dataLabels: {
    //     dropShadow: {
    //       enabled: false,
    //     },
    //   },
    //   title: {
    //     text: "",
    //     align: "left",
    //     // floating: true
    //   },
    //   colors: colors
    // };
  }

  /**
  * Fetches the data
  */
  private fetchData() {
    this.BestSelling = BestSelling;
    this.TopSelling = TopSelling;
    this.RecentSelling = RecentSelling;
    this.statData = statData;
  }

  /**
 * Sale Location Map
 */
  options = {
    layers: [
      tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w", {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: 0,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      })
    ],
    zoom: 1.1,
    center: latLng(28, 1.5)
  };
  layers = [
    circle([41.9, 12.45], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([12.05, -61.75], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([1.3, 103.8], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
  ];

  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

  /**
  * Swiper Vertical  
   */
  Vertical = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    vertical: true // Enable vertical sliding
  };

  /**
   * Recent Activity
   */
  toggleActivity() {
    const recentActivity = document.querySelector('.layout-rightside-col');
    if (recentActivity != null) {
      recentActivity.classList.toggle('d-none');
    }

    if (document.documentElement.clientWidth <= 767) {
      const recentActivity = document.querySelector('.layout-rightside-col');
      if (recentActivity != null) {
        recentActivity.classList.add('d-block');
        recentActivity.classList.remove('d-none');
      }
    }
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    const recentActivity = document.querySelector('.layout-rightside-col');
    if (recentActivity != null) {
      recentActivity.classList.remove('d-block');
    }
  }

}
