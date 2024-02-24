import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BebidasCalientesService {
  API_URI = 'https://crepas-cash-users-proyect-api.onrender.com/bebidasCalientes'
  constructor(private http: HttpClient) { }
  getBebidas(){
    return this.http.get((this.API_URI));
  }

  getBebida(id: any){
    return this.http.get((this.API_URI)+ '/C/'+ id);
  }

  getStock(){
    return this.http.get((this.API_URI)+'/Cstock');
  }
}
