import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesServiceService {
  API_URI = 'https://crepas-cash-users-proyect-api.onrender.com/ventas'
  constructor(private http: HttpClient) { }

  sales(ventas: any, date: any){
    return this.http.post((this.API_URI)+'/sales/'+ date, ventas);
  }
}
