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
  breadCrumbItems!: Array<{}>;
  public areaChart: areaChart
  public salesChart: sideBarOption
  public barChart: barChartOption
  public barChartTop: barChartOption
  public barChartLeast: barChartOption
  public areaChartYearlySalesComparison: areaChart
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
  tabledata:any
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

  district: any

  ngOnInit(): void {
    this.getDashboardData()
  }
  constructor(public service: FormService) {
    this.areaChart = {} as areaChart
    this.barChart = {} as barChartOption
    this.salesChart = {} as sideBarOption
    this.areaChartYearlySalesComparison = {} as areaChart
    this.barChartTop = {} as barChartOption
    this.barChartLeast = {} as barChartOption
  }
  getDashboardData() {
    this.service.getDashBoard().subscribe((res: any) => {
      console.log('>>>', res.data)
      this.overAllChart = res.data.parameters.imfsAndBeerComparison.periodRange
      this.location = res.data.globalParameters.regions
      this.districts = res.data.globalParameters.regionId
      this.chartData = res.data.charts.liveSalesAndCompareByDate
      this.regionwiseDropdown = res.data.parameters.regionWiseBarChart.years
      this.top5DistrictBarChart = res.data.parameters.top5DistrictBarChart.years
      this.imfsAndBeerComparisonYear = res.data.parameters.imfsAndBeerComparison.years
      this.imfsAndBeerComparisonMonth = res.data.parameters.imfsAndBeerComparison.month
      this.yearlySalesComparison = res.data.parameters.yearlySalesComparison.years
      this.valueData = res.data.charts.yearlyCummulativeComparison
      // this.tabledata= res.data.chart.leastPerformanceGrowthRate
      // console.log(">>>>table",this.tabledata)
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
        series: res.data.charts.comparisonBetweenDate
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
            // text: "$ (thousands)"
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
        series: res.data.charts.top5DistrictBarChart.series,
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
            // text: "$ (thousands)"
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
        series: res.data.charts.leastPerformance.series,
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
            // text: "$ (thousands)"
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

  products = [
    {
      performanceName: "01",
      shopName: "443",
      district: "Ambattur II",
      imfsSalesGrowth: "-5%",
      beerSalesGrowth: "-4-5%",
      overAllPercentage: "-10%"
    },
    {
      performanceName: "02",
      shopName: "037",
      district: "Ambattur I",
      imfsSalesGrowth: "-9.6",
      beerSalesGrowth: "10.4",
      overAllPercentage: "10%"
    },
    {
      performanceName: "03",
      shopName: "733",
      district: "Ambattur III",
      imfsSalesGrowth: "-5",
      beerSalesGrowth: "-8",
      overAllPercentage: "13%"
    },
  ]

  selectedValueRegionWise: any
  locationType: any
  date1: any
  date2: any
  filterComparison(event: any, data: any, value: any, type: any) {
    this.selectedValueRegionWise = event.target.value;
    this.locationType = data.target.value;
    this.districts = data.target.value
    this.date1 = event.target.value;
    this.date2 = event.target.value;
    console.log('Selected value:', this.selectedValueRegionWise);
    this.service.getFilterDashBoardComparison('comparisonBetweenDate', this.selectedValueRegionWise,
      // this.locationType,
      this.date1,
      this.date2).subscribe((res: any) => {
        console.log(res)
        this.barChart = {
          series: res.data.charts.comparisonBetweenDate.series,
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
              // text: "$ (thousands)"
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
  selectLeastFiveYear:any
  selectedDistrict:any
  filterLeastfiveDistrict(event: any, dropdownType: any) {
    if (dropdownType === 'year') {
      this.selectLeastFiveYear = event?.target?.value;
    } else if (dropdownType === 'location') {
      this.selectedDistrict = event?.target?.value
    }
    console.log('Selected value:', this.selectLeastFiveYear,this.selectedDistrict);
    this.service.getFilterDashBoard('leastPerformance', this.selectLeastFiveYear,this.selectedDistrict).subscribe((res: any) => {
      console.log(res)
      this.barChartLeast = {
        series: res.data.charts.leastPerformance.series,
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
          charts.leastPerformance
          .xaxis,
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
              return "$ " + val + " thousands";
            }
          }
        }
      } as barChartOption
    })
  }
  selectedyearForTopFive: any
  selectedDistrictTopFive: any
  filterTopFive(event: any, dropdownType: any) {
    if (dropdownType === 'year') {
      this.selectedyearForTopFive = event?.target?.value;
    } else if (dropdownType === 'location') {
      this.selectedDistrictTopFive = event?.target?.value
    }
    console.log(this.selectedDistrictTopFive,this.selectedyearForTopFive)
    this.service.getFilterDashBoard('top5DistrictBarChart', this.selectedyearForTopFive, this.selectedDistrictTopFive).subscribe((res: any) => {
      console.log(res)
      this.barChartTop = {
        series: res.data.charts.top5DistrictBarChart.series,
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
          charts.top5DistrictBarChart
          .xaxis,
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
              return "$ " + val + " thousands";
            }
          }
        }
      } as barChartOption
    })
  }
  selectedMonthOverallSales:any
  selectedDistrictOverallSales:any
  filterOverallSales(event: any,dropdownType:any) {
    if (dropdownType === 'month') {
      this.selectedMonthOverallSales = event?.target?.value;
    } else if (dropdownType === 'location') {
      this.selectedDistrictOverallSales = event?.target?.value
    }
    this.service.getFilterDashBoardForOverallSales('imfsAndBeerComparison', this.selectedMonthOverallSales,this.selectedDistrictOverallSales).subscribe((res: any) => {
      console.log(res)
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
    })
  }
  selectedFilterSalesDistrict:any
  filterSalesComparison(event?:any) {
    this.selectedFilterSalesDistrict = event?.target?.value;
    const checkboxes = document.querySelectorAll('.form-check-input:checked');
    const selectedValues = Array.from(checkboxes).map((checkbox: any) => checkbox.value);
    const selectedValuesArray = Array.isArray(selectedValues) ? selectedValues : [selectedValues];
    console.log(selectedValuesArray,this.selectedFilterSalesDistrict)

    this.service.getFilterSalesComparison('yearlySalesComparison', selectedValuesArray,this.selectedFilterSalesDistrict).subscribe((res: any) => {
      console.log(res)
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
    })
  }
  getDistrict(event: any) {
    console.log(event.target.value)
    const data = event.target.value
    this.service.getDistrict(data).subscribe((res: any) => {
      console.log(res)
      this.districts = res.data.districts
    })
  }
}

