import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, environmentdata } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl:string='';
  constructor(private http:HttpClient) { 
    this.apiUrl = environmentdata.endPoint;
  }

  authenticate(data:any){
    // User/login
    return this.http.post(`${this.apiUrl}auth/login`, data);
  }
  //Reset
  changePassword(data: any) {
    return this.http.post(`${this.apiUrl}User/changePassword`, data);
  }
  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}User/resetPassword`, data);
  }
}
