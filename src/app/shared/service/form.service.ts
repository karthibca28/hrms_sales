import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, environmentdata } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl: string = '';
  baseUrl: string = ''
  constructor(private http: HttpClient) {
    this.apiUrl = environmentdata.endPoint;
    this.baseUrl = environmentdata.dataEndPoint
  }

  getDashBoard() {
    return this.http.get(`${this.baseUrl}dashboard/insights`);
  }
  getTableForDashBoard() {
    return this.http.get(`${this.baseUrl}dashboard/growthPerformanceRate`);
  }
  getTableForDashBoardFilter(regionId: any, districtId: any) {
    return this.http.get(`${this.baseUrl}dashboard/growthPerformanceRate?${regionId ? '&regionId=' + regionId : ''}${districtId ? '&districtId=' + districtId : ''}`);
  }
  getFilterDashBoard(chartName: any, year: any, regionId: any) {
    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}${year ? '&year=' + year : ''}${regionId ? '&regionId=' + regionId : ''}`);
  }
  private previousRegionId: any;

  getFilterSalesComparison(chartName: any, year: any, regionId: any) {
    const actualRegionId = (regionId !== null && regionId !== undefined) ? regionId : this.previousRegionId;
    const yearStrings = year.map((year:any) => `"${year}"`).join(',');
    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}&years=[${yearStrings}]${actualRegionId ? '&regionId=' + actualRegionId : ''}`);
    // return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}&years=[${year.toString()}]${actualRegionId ? '&regionId=' + actualRegionId : ''}`);
  }
  getFilterFestival(chartName: any, year: any, regionId: any) {
    const actualRegionId = (regionId !== null && regionId !== undefined) ? regionId : this.previousRegionId;
    this.previousRegionId = actualRegionId;

    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}&years=[${year}]${actualRegionId ? '&regionId=' + actualRegionId : ''}`);
  }
  getDistrict(data: any) {
    return this.http.get(`${this.baseUrl}district-manager-offices?$for=dropdown&regionId=${data}`);
  }
  getFilterDashBoardForOverallSales(chartName: any, year: any, regionId: any) {
    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}${year ? '&periodRange=' + year : ''}${regionId ? '&regionId=' + regionId : ''}`);
  }
  getFilterDashBoardComparison(chartName: any, regionId: any, districtId: any, date1: any, date2: any) {
    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}${regionId ? '&regionId=' + regionId : ''}${districtId ? '&districtId=' + districtId : ''}${date1 ? '&date1=' + date1?.split('-').reverse().join('-') : ''}${date2 ? '&date2=' + date2?.split('-').reverse().join('-') : ''}`);
  }
  getFilterDashBoardforimfsAndBeerComparison(chartName: any, year: any, month: any) {
    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}&year=${year}&month=${month}`);
  }
  getLiveStatus(chartName: any) {
    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}`);
  }
  getregionWiseSales(data: any) {
    return this.http.get(`${this.baseUrl}sales/regions?${data ? 'year=' + data : ''}`);
  }
  getTopFiveDistrictSales(data: any) {
    return this.http.get(`${this.baseUrl}sales/districts?${data ? 'year=' + data : ''}`);
  }
  getMonthlySalesPerformance() {
    return this.http.get(`${this.baseUrl}sales/monthlyPerformance`);
  }
}