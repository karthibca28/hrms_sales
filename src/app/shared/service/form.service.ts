import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, environmentdata } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.apiUrl = environmentdata.endPoint;
  }}