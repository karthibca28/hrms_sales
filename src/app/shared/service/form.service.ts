import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, environmentdata } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl: string = '';
  baseUrl:string =''
  constructor(private http: HttpClient) {
    this.apiUrl = environmentdata.endPoint;
    this.baseUrl = environmentdata.dataEndPoint
  }

  getDashBoard() {
    return this.http.get(`${this.baseUrl}dashboard/insights`);
  }
  getFilterDashBoard(chartName:any,year:any){
    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}&year=${year}`);
  }
  getFilterDashBoardforimfsAndBeerComparison(chartName:any,year:any,month:any){
    return this.http.get(`${this.baseUrl}dashboard/updateChart?chartName=${chartName}&year=${year}&month=${month}`);
  }
  getregionWiseSales(data:any) {
    return this.http.get(`${this.baseUrl}sales/regions?year=${data}`);
  }
}