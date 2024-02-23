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
import { Table } from 'primeng/table';
import { FormService } from 'src/app/shared/service/form.service';
import { InterpageService } from 'src/app/shared/service/interpage.service';
import { LoadingService } from 'src/app/shared/service/loading.service';

interface sideBarOption {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: any;
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
  yaxis: ApexYAxis;
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
  breadCrumbItems!: Array<{}>;
  public areaChart: areaChart
  public salesChart: sideBarOption
  public barChart: barChartOption
  public barChartTop: barChartOption
  public barChartLeast: barChartOption
  public areaChartYearlySalesComparison: areaChart
  public areChartFestival: areaChart
  regionwiseDropdown: any
  top5DistrictBarChart: any
  imfsAndBeerComparisonYear: any
  imfsAndBeerComparisonMonth: any
  yearlySalesComparison: any
  chartData: any
  location: any
  districts: any
  overAllChart: any
  previousCurrent: any
  valueData: any
  tabledata: any
  receivedId: any
  comparisonGrowthPercentage: any;
  districtName: any
  globalSearch: any[] = ['districtName', 'totalPrev3MonthBeerSales', 'totalPrev3MonthIMFSales', 'totalPrev3MonthSales', 'totalPrevMonthBeerSales', 'totalPrevMonthIMFSales', 'totalPrevMonthSales'];
  // [{
  //   label: "Chennai", value: 1
  // },
  // {
  //   label: "Coimbatore", value: 2
  // },
  // {
  //   label: "Madurai", value: 3
  // },
  // {
  //   label: "Salem", value: 4
  // },
  // {
  //   label: "Trichy", value: 5
  // }]
  monthFilter = [
    {
      label: "3 Months", value: '3'
    },
    {
      label: "6 Months", value: '6'
    },
    {
      label: "9 Months", value: '9'
    }
  ]
  district: any
  @ViewChild('dt1') dt1!: Table;
  yesterdayDate: any;
  currentDate: any;
  colorPalette: string[] = ['#E14D57', '#3D88B9', '#6DB28E', '#F5A623', '#5C5C5C'];
  ngOnInit(): void {
    this.getDashboardData()
    this.InterpageService.id$.subscribe((id) => {
      this.receivedId = id;
    });

  }
  constructor(public service: FormService, private loadingService: LoadingService, private InterpageService: InterpageService) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.yesterdayDate = yesterday.toISOString().split('T')[0];
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.areaChart = {} as areaChart
    this.barChart = {} as barChartOption
    this.salesChart = {
      dataLabels: {
        enabled: false,
        formatter: (v: string) => `${v} cr`
      },
    } as sideBarOption
    this.areaChartYearlySalesComparison = {} as areaChart
    this.barChartTop = {} as barChartOption
    this.barChartLeast = {} as barChartOption
    this.areChartFestival = {} as areaChart
  }
  applyGlobalFilter(event: any) {
    const filterValue = event.target.value;
    this.dt1.filterGlobal(filterValue, 'contains');
  }

  getColor(value: number): string {
    if (value > 0) {
      return 'green';
    } else if (value < 0) {
      return 'red';
    } else {
      return 'orange';
    }
  }

  getDashboardData() {
    this.loadingService.showLoader();
    this.service.getDashBoard().subscribe((res: any) => {
      this.overAllChart = res.data.parameters.imfsAndBeerComparison.periodRange
      this.location = res.data.globalParameters.regions
      this.location.unshift({ value: '', label: 'Across TamilNadu' })
      this.districts = res.data.globalParameters.regionId
      this.chartData = res.data.charts.liveSalesAndCompareByDate
      this.regionwiseDropdown = res.data.parameters.regionWiseBarChart.years
      this.top5DistrictBarChart = res.data.parameters.top5DistrictBarChart.years
      this.imfsAndBeerComparisonYear = res.data.parameters.imfsAndBeerComparison.years
      this.imfsAndBeerComparisonMonth = res.data.parameters.imfsAndBeerComparison.month
      this.yearlySalesComparison = res.data.parameters.yearlySalesComparison.years
      this.valueData = res.data.charts.yearlyCummulativeComparison
      this.tabledata = res.data.charts.leastPerformanceGrowthRate
      // this.monthFilter = res.data.charts.leastPerformanceGrowthRate.periodRange
      console.log(this.monthFilter)
      this.comparisonGrowthPercentage = res.data.charts.comparisonBetweenDate.properties.growthPercentage
      console.log(">>>> %", this.comparisonGrowthPercentage)
      this.loadingService.hideLoader();
      const now = new Date()
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
        xaxis: {categories:res.data.
          charts.yearlyCummulativeComparison.xaxis.categories,
       
        },
        yaxis: {
          title: {
            // text: "₹ (Cr)"
          },
          labels: {
            formatter: val => `${val} Cr`
          }
        },
        tooltip: {
        
          
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
          charts.yearlySalesComparison.xaxis,
        yaxis: {
          title: {
            // text: "Sales (in Cr)"
          },
          labels: {
            formatter: val => `${val} Cr`
          }
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      };
      this.barChart = {
        series: res.data.charts.comparisonBetweenDate
          .series,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%",
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
            // text: "₹ (Cr)"
          },
          labels: {
            formatter: (value) => { return `${value} Cr` },
          }
        },
        fill: {
          opacity: 1,
          // colors: ['#00798C', '#EDAE49']
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "₹ " + val + " Cr";
            }
          }
        }
      } as barChartOption
      const numericSeries = res.data.charts.imfsAndBeerComparison.series;
      const seriesWithCr = numericSeries.map((value: any) => value.toString() + "value(Croses)");
      console.log(seriesWithCr)
      this.salesChart = {
        series: res.data.charts.imfsAndBeerComparison.series,
        chart: {
          type: "donut",
        },
        plotOptions: {
          pie: {
            expandOnClick: false
          }
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + ".00" + " Rs"
            },
            title: {
              formatter: function (seriesName: any) {
                return ''
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
          formatter: function () {
            return ''
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        labels: res.data.charts.imfsAndBeerComparison.labels.map((value: any) => value + " in value(Crores)"),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
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
      this.barChartTop = {
        series: res.data.charts.regionWiseBarChart.series,
        chart: {
          type: "bar",
          height: 350,
        } as any,
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "40%",
            // colors:['#00E396']
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
        xaxis: res.data.charts.regionWiseBarChart.xaxis,
        yaxis: {
          title: {
            // text: "₹ (Cr)"
          },
          labels: {
            formatter: (value) => { return `${value} Cr` },
          }
        },
        fill: {
          opacity: 1,
          colors: ['#00E396']
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "₹ " + val + " Cr";
            }
          }
        },
        legend: {}
      } as barChartOption
      this.barChartLeast = {
        series: res.data.charts.leastPerformance.series,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "40%",
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
            // text: "₹ (Cr)"
          },
          labels: {
            formatter: (value) => { return `${value} Cr` },
          }
        },
        fill: {
          opacity: 1,
          colors: ['#E14D57']
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "₹ " + val + " Cr";
            }
          }
        }
      } as barChartOption
      this.areChartFestival = {
        series: res.data.charts.
          yearlyFestival
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
        xaxis: res.data.charts.yearlyFestival,
        yaxis: {
          title: {
            // text: "₹ (Cr)"
          },
          labels: {
            formatter: (value) => { return `${value} Cr` },
          }
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      };
    })
  }
  districtforComparison: any
  locationType: any
  date1: any
  date2: any
  filterComparison(event: any, dropdownType: any) {

    this.loadingService.showLoader();
    if (dropdownType === 'region') {
      this.locationType = event.value;
      this.districtforComparison = ''
    } else if (dropdownType === 'district') {
      this.districtforComparison = event.value
    }
    else if (dropdownType === 'date1') {
      this.date1 = event.target.value;
      if (!this.date2) {
        this.date2 = new Date().toISOString().split('T')[0];
      }
    } else if (dropdownType === 'date2') {
      this.date2 = event.target.value;
      if (!this.date1) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        this.date1 = yesterday.toISOString().split('T')[0];
      }
    }
    if (!this.date1) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.date1 = yesterday.toISOString().split('T')[0];
    }
    if (!this.date2) {
      this.date2 = new Date().toISOString().split('T')[0];
    }
    this.service.getFilterDashBoardComparison('comparisonBetweenDate', this.locationType,
      this.districtforComparison,
      this.date1,
      this.date2).subscribe((res: any) => {
        this.loadingService.hideLoader();
        this.barChart = {
          series: res.data.charts.comparisonBetweenDate.series,
          chart: {
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "25%",
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
              // text: "₹ (Cr)"
            },
            labels: {
              formatter: (value) => { return `${value} Cr` },
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "₹ " + val + " Cr";
              }
            }
          }
        } as barChartOption
      })
  }
  selectLeastFiveYear: any
  selectedDistrict: any
  filterLeastfiveDistrict(event: any, dropdownType: any) {
    this.loadingService.showLoader();
    if (dropdownType === 'year') {
      this.selectLeastFiveYear = event?.value;
      this.selectedDistrict = ''
    } else if (dropdownType === 'location') {
      this.selectedDistrict = event?.value
    }
    this.service.getFilterDashBoard('leastPerformance', this.selectLeastFiveYear, this.selectedDistrict).subscribe((res: any) => {
      this.loadingService.hideLoader();
      this.barChartLeast = {
        series: res.data.charts.leastPerformance.series,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%",
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
          charts.leastPerformance
          .xaxis,
        yaxis: {
          title: {
            // text: "₹ (Cr)"
          },
          labels: {
            formatter: (value) => { return `${value} Cr` },
          }
        },
        fill: {
          opacity: 1,
          colors: ['#E14D57']
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "₹ " + val + " Cr";
            }
          }
        }
      } as barChartOption
    })
  }
  selectedyearForTopFive: any
  selectedDistrictTopFive: any
  filterTopFive(event: any, dropdownType: any) {
    this.loadingService.showLoader();
    if (dropdownType === 'year') {
      this.selectedyearForTopFive = event?.value;
    } else if (dropdownType === 'location') {
      this.selectedDistrictTopFive = event?.value
    }
    this.service.getFilterDashBoard('regionWiseBarChart', this.selectedyearForTopFive, this.selectedDistrictTopFive).subscribe((res: any) => {
      this.loadingService.hideLoader();
      this.barChartTop = {
        series: res.data.charts.regionWiseBarChart.series,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%",
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
          charts.regionWiseBarChart
          .xaxis,
        yaxis: {
          title: {
            // text: "₹ (Cr)"
          }
        },
        fill: {
          opacity: 1,
          colors: ['#00E396']
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "₹ " + val + " Cr";
            }
          }
        }
      } as barChartOption
    })
  }
  selectedMonthOverallSales: any
  selectedDistrictOverallSales: any
  filterOverallSales(event: any, dropdownType: any) {
    this.loadingService.showLoader();
    if (dropdownType === 'month') {
      this.selectedMonthOverallSales = event?.value;
    } else if (dropdownType === 'location') {
      this.selectedDistrictOverallSales = event?.value
    }
    this.service.getFilterDashBoardForOverallSales('imfsAndBeerComparison', this.selectedMonthOverallSales, this.selectedDistrictOverallSales).subscribe((res: any) => {
      this.loadingService.hideLoader();
      this.salesChart = {
        dataLabels: {
          enabled: false,
          formatter: (v: string) => `${v} cr`
        },
        series: res.data.charts.imfsAndBeerComparison.series,
        chart: {
          type: "donut"
        },
        labels: res.data.charts.imfsAndBeerComparison.map((value: any) => value + " in Crores"),
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
    })
  }
  selectedFilterSalesDistrict: any
  getDistrict(event: any) {
    this.districts = []
    this.districtName = ''
    const data = event.value
    this.service.getDistrict(data).subscribe((res: any) => {
      this.districts = res.data.districts
      this.districts.unshift({ value: '', label: 'All' })
    })
  }
  tableYear: any
  tableregion: any
  filterTable(event: any, dropdownType: any) {
    this.loadingService.showLoader();
    if (dropdownType === 'month') {
      this.tableYear = event?.value;
    } else if (dropdownType === 'location') {
      this.tableregion = event?.value
    }
    this.service.getFilterDashBoard('leastPerformanceGrowthRate', this.tableYear, this.tableregion).subscribe((res: any) => {
      this.loadingService.hideLoader();
    })
  }
  selectedFestival: any
  selectedFestivalValues: string[] = [];
  selectedComparisonValues: string[] = [];

  filterFestival(event?: any) {
    this.loadingService.showLoader();
    this.selectedFestival = event?.value;

    const cardId = 'festivalCheckbox';
    const checkboxes = document.querySelectorAll(`#${cardId}:checked`);
    this.selectedFestivalValues = Array.from(checkboxes).map((checkbox: any) => checkbox.value);
    this.service.getFilterSalesComparison('yearlyFestival', this.selectedFestivalValues, this.selectedFestival)
      .subscribe((res: any) => {
        this.loadingService.hideLoader();
        this.areChartFestival = {
          series: res.data.charts.yearlyFestival.series,
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
          xaxis: res.data.charts.yearlyFestival.xaxis,
          yaxis: {
            title: {
              // text: "₹ (Cr)"
            },
            labels: {
              formatter: (value) => { return `${value} Cr` },
            }
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm"
            }
          }
        };
      });
  }

  filterSalesComparison(event?: any) {
    this.loadingService.showLoader();
    this.selectedFilterSalesDistrict = event?.value;
    const cardId = 'salesCheckbox';
    const checkboxes = document.querySelectorAll(`#${cardId}:checked`);
    this.selectedComparisonValues = Array.from(checkboxes).map((checkbox: any) => String(checkbox.value));
    console.log(this.selectedComparisonValues)
    this.service.getFilterSalesComparison('yearlySalesComparison', this.selectedComparisonValues, this.selectedFilterSalesDistrict)
      .subscribe((res: any) => {
        this.loadingService.hideLoader();
        this.areaChartYearlySalesComparison = {
          series: res.data.charts.yearlySalesComparison.series,
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
          xaxis: res.data.charts.yearlySalesComparison.xaxis,
          yaxis: {
            title: {
              // text: "₹ (Cr)"
            },
            labels: {
              formatter: (value) => { return `${value} Cr` },
            }
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm"
            }
          }
        };
      });
  }
  refreshLiveStatus() {
    this.loadingService.showLoader();
    this.service.getLiveStatus('liveSalesAndCompareByDate')
      .subscribe((res: any) => {
        this.chartData = res.data.charts.liveSalesAndCompareByDate
        this.loadingService.hideLoader();
      })
  }
}

