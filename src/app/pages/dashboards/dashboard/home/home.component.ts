import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { pad } from 'lodash';
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
import { ViewOverallSalesComponent } from '../view-overall-sales/view-overall-sales.component';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartData } from 'chart.js/auto';
import { number } from 'echarts';
import * as XLSX from 'xlsx';

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
  barChartTopRegion:barChartOption
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
  yesterDayDateofComparison: any
  previousCurrent: any
  valueData: any
  tabledata: any
  receivedId: any
  comparisonGrowthPercentage: any;
  districtName: any
  currentDateofComparison: any
  finalCalculatedResult: any
  BeerResult: any
  leastperformance: any
  voloumeSecondChart: any
  voloumeThirdChart: any
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
  tableData: any
  searchText: any;
  filteredData: any[] = [];
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
    this.getTableData()
    this.InterpageService.id$.subscribe((id) => {
      this.receivedId = id;
    });


  }
  constructor(private router: Router, public dialog: MatDialog, public service: FormService, private loadingService: LoadingService, private InterpageService: InterpageService) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.yesterdayDate = yesterday.toISOString().split('T')[0];
    this.yesterDayDateofComparison = yesterday.toISOString().split('T')[0];
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.currentDateofComparison = today.toISOString().split('T')[0];
    this.areaChart = {} as areaChart
    this.barChart = {} as barChartOption
    this.barChartTopRegion = {} as barChartOption
    this.salesChart = {
      dataLabels: {
        enabled: false,
        formatter: (v: string) => `${v} cr`
      },
    } as sideBarOption
    this.areaChartYearlySalesComparison = {} as areaChart
    this.barChartTop = {} as barChartOption
    this.barChartLeast = {
    } as barChartOption
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

  getTableData() {
    this.service.getTableForDashBoard().subscribe((res: any) => {
      this.tableData = res.data
      this.filteredData = this.tableData.records;
      console.log(res)
    }
    )
  }

  filterData() {
    this.filteredData = this.tableData.records.filter((record: any) => {
      const shopNumberString = record.shopNumber.toString();
      if (shopNumberString.includes(this.searchText.toString())) {
        return true;
      }
      return false;
    });
  }
  

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'TasmacData');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadLink: any = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
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
      this.leastperformance = res.data.charts.leastPerformance.barChartLabels;
      this.leastperformance = res.data.charts.leastPerformance
      // this.monthFilter = res.data.charts.leastPerformanceGrowthRate.periodRange
      console.log(this.monthFilter)
      this.comparisonGrowthPercentage = res.data.charts.comparisonBetweenDate.properties
      const date1IMFS = parseInt(this.comparisonGrowthPercentage.date1.imfsCases, 10) + parseInt(this.comparisonGrowthPercentage.date1.beerCases, 10);
      const date2IMFS = parseInt(this.comparisonGrowthPercentage.date2.imfsCases, 10) + parseInt(this.comparisonGrowthPercentage.date2.beerCases, 10);
      const nonNegativeResult = date2IMFS !== 0 ? parseFloat((((date2IMFS / date1IMFS) - 1) * 100).toFixed(2)) : 0;
      this.finalCalculatedResult = isNaN(nonNegativeResult) ? '' : nonNegativeResult;
      console.log(date1IMFS, date2IMFS, this.finalCalculatedResult)
      const chart1Volume = parseInt(this.chartData?.today?.imfsSoldVolumeCases) + parseInt(this.chartData?.today?.beerSoldVolumeCases)
      const chart2Volume = parseInt(this.chartData?.previousDay?.imfsSoldVolumeCases) + parseInt(this.chartData?.previousDay?.beerSoldVolumeCases)
      const chart3Volume = parseInt(this.chartData?.previousYear?.imfsSoldVolumeCases) + parseInt(this.chartData?.previousYear?.beerSoldVolumeCases)
      const volume1 = parseFloat((((chart1Volume / chart2Volume) - 1) * 100).toFixed(2))
      console.log('>>>>>>>>>>>>>>>', volume1)
      this.voloumeSecondChart = volume1;
      console.log('>>>>>>>>>>>>>>>', this.voloumeSecondChart)
      const voloume2 = parseFloat((((chart1Volume / chart3Volume) - 1) * 100).toFixed(2))
      this.voloumeThirdChart = voloume2
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
        xaxis: {
          categories: res.data.
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
      this.barChartTopRegion = {
        series: res.data.charts.top5DistrictBarChart.series,
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
          charts.top5DistrictBarChart.xaxis,
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
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const selecteddate = pad(config.dataPointIndex + 1, 2);
              if (selecteddate as any == 1) {
                console.log(selecteddate);
                this.router.navigate(['/main/page/view-overall-sales']);

                // const dialogRef = this.dialog.open(ViewOverallSalesComponent,
                //   { width: '60%', panelClass: 'my-dialog', });
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
          charts.leastPerformance.xaxis,
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
      this.yesterDayDateofComparison = this.date1
      if (!this.date2) {
        this.date2 = new Date().toISOString().split('T')[0];
        this.yesterdayDate = this.date1
      }
    } else if (dropdownType === 'date2') {
      this.date2 = event.target.value;
      this.currentDateofComparison = this.date2
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
        this.comparisonGrowthPercentage = res.data.charts.comparisonBetweenDate.properties
        const date1IMFS = parseInt(this.comparisonGrowthPercentage.date1.imfsCases) + parseInt(this.comparisonGrowthPercentage.date1.beerCases);
        const date2IMFS = parseInt(this.comparisonGrowthPercentage.date2.imfsCases) + parseInt(this.comparisonGrowthPercentage.date2.beerCases);
        const nonNegativeResult = parseFloat((((date2IMFS / date1IMFS) - 1) * 100).toFixed(2))
        this.finalCalculatedResult = isNaN(nonNegativeResult) ? '' : nonNegativeResult;
        console.log(nonNegativeResult, date1IMFS, date2IMFS)
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
      // this.barChartLeast = {
      //   barChartLabels: res.data.charts.leastPerformance.barChartLabels,
      //   barChartData: { datasets: res.data.charts.leastPerformance.datasets },

      //   type: 'bar',
      //   barChartLegend: true,
      //   barChartPlugins: [],
      // } as barChartOptionChartJs

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
          charts.leastPerformance.xaxis,
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
    })
  }
  selectedyearForTopFive: any
  selectedDistrictTopFive: any
  selectedyearRegionWise:any
  selectedDistrictRegionWise:any
  filterRegionWise(event: any, dropdownType: any) {
    this.loadingService.showLoader();
    if (dropdownType === 'year') {
      this.selectedyearRegionWise = event?.value;
    } else if (dropdownType === 'location') {
      this.selectedDistrictRegionWise = event?.value
    }
    this.service.getFilterDashBoard('regionWiseBarChart', this.selectedyearRegionWise, this.selectedDistrictRegionWise).subscribe((res: any) => {
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
  filterTopfiveDistrict(event: any, dropdownType: any) {
    this.loadingService.showLoader();
    if (dropdownType === 'year') {
      this.selectedyearForTopFive = event?.value;
    } else if (dropdownType === 'location') {
      this.selectedDistrictTopFive = event?.value
    }
    this.service.getFilterDashBoard('top5DistrictBarChart', this.selectedyearForTopFive, this.selectedDistrictTopFive).subscribe((res: any) => {
      this.loadingService.hideLoader();
      this.barChartTopRegion = {
        series: res.data.charts.top5DistrictBarChart.series,
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
          charts.top5DistrictBarChart.xaxis,
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
          enabled: true,
        },
        series: res.data.charts.imfsAndBeerComparison.series,
        chart: {
          type: "donut",
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const selecteddate = pad(config.dataPointIndex + 1, 2);
              if (selecteddate as any == 1) {
                console.log(selecteddate);
                const dialogRef = this.dialog.open(ViewOverallSalesComponent,
                  { width: '60%', panelClass: 'my-dialog', });
              }
            }
          }
        },
        labels: res.data.charts.imfsAndBeerComparison.labels.map((value: any) => value + " in Crores"),
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
    if (data == '') {
      this.districts.unshift({ value: '', label: 'All' })
    }
    else {
      this.service.getDistrict(data).subscribe((res: any) => {
        this.districts = res.data.districts
        this.districts.unshift({ value: '', label: 'All' })
      })
    }
  }
  tableYear: any
  tableregion: any
  filterTable(event: any, dropdownType: any) {
    this.loadingService.showLoader();
    if (dropdownType === 'region') {
      this.tableYear = event?.value;
    } else if (dropdownType === 'district') {
      this.tableregion = event?.value
    }
    this.service.getTableForDashBoardFilter(this.tableYear, this.tableregion).subscribe((res: any) => {
      this.filteredData = res.data.records
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
  sampledata = [
    {
      region: "Coimbatore",
      dis: "THE NILGIRIS",
      rvshop: "8203",
      beersalesgrowth: '-1.13',
      imfs: '-1.55',
      overall: '-1.25',
      highestsold: '1',
      highsoldbrands: 'Wine : MISTY GRAPES RED WINE',
      nosold: '3',
      nosoldbrands: 'Brandy : GOLDEN GRAPE ORDINARY BRANDY,HONEY BEE MEDIUM BRANDY,DIAMOND BRANDY'
    },
    {
      region: "Madurai",
      dis: "MADURAI (SOUTH)",
      rvshop: "5105",
      beersalesgrowth: '-0.9',
      imfs: '-1.2',
      overall: '-1.1',
      highestsold: '3',
      highsoldbrands: 'Brandy : HONEY BEE MEDIUM BRANDY,Rum : OLD MONK GOLD RESERVE PREMIUM RUM,Whisky: VORION NO.1 INDIAN CLASSIC WHISKY,TOP STAR SPECIAL WHISKY ',
      nosold: '1',
      nosoldbrands: 'Wine : RED SEA RUBY FORTIFIED WINE'
    },
    {
      region: "Chennai",
      dis: "CHENNAI  ( CENTRAL)",
      rvshop: "302",
      beersalesgrowth: '-0.60',
      imfs: '-0.22',
      overall: '-0.43',
      highestsold: '1',
      highsoldbrands: 'Votka : MAGIC MOMENTS PREMIUM CHOCOLATE VODKA,BRISNOFF MED VODKA',
      nosold: '4',
      nosoldbrands: 'Brandy : ANACONDA NO.1 EXTRA VSOP BRANDY,Rum : OLD MONSTER XXX RUM,Whisky : TEACHERS 50 12 YRS SCOTCH WHISKY,Wine : GLOBUS FORTIFIED PORT WINE,THE WAREHOUSE RED WINE'
    },
    {
      region: "Coimbatore",
      dis: "THE NILGIRIS",
      rvshop: "8202",
      beersalesgrowth: '-0.40',
      imfs: '-0.60',
      overall: '-0.40',
      highestsold: '2',
      highsoldbrands: 'Wine : THE WAREHOUSE RED WINE,Brandy : 1848 PREMIUM XO BRANDY',
      nosold: '2',
      nosoldbrands: 'Brandy : RADIUM HOUSE FRENCH BRANDY,Rum : BLACK PEARL XXX RUM,TI MADIRA XXX RUM'
    },
    {
      region: "Chennai",
      dis: "CHENNAI  ( CENTRAL)",
      rvshop: "306",
      beersalesgrowth: '-0.06',
      imfs: '-0.02',
      overall: '-0.02',
      highestsold: '5',
      highsoldbrands: 'Brandy : SHOT OLP BRANDY,Rum : TI MADIRA XXX RUM,Whisky : 00 PIPER DELUXE BLENDED SCOTCH WHISKY,Wine : RED SEA RUBY FORTIFIED WINE,Votka : ACTIVATOR VANILLA VODKA',
      nosold: '0',
      nosoldbrands: 'No Items'
    },

  ]

  salesChartData(data: any) {
    console.log(data)
  }

  dataFlag: boolean = false
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: false,
        ticks: {
          callback: function (value, index, ticks) {
            return value + "Cr";
          }
        }

      }
    }

  };


}