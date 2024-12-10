import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './environment';

@Injectable({
  providedIn: 'root'
})
export class SalesServiceService {
  API_URI = API_BASE_URL+'/ventas'
  constructor(private http: HttpClient) { }

  sales(ventas: any, date: any, mesa: number){
    return this.http.post((this.API_URI)+'/sales/'+ date + '/' + mesa, ventas);
  }
}
