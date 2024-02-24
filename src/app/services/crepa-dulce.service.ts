import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrepaDulceService {
  API_URI = 'https://crepas-cash-users-proyect-api.onrender.com/crepaDulce'
  constructor(private http: HttpClient) { }
  // Harinas
  getHarinas() {
    return this.http.get((this.API_URI) + '/H/');
  }

  getHarina(id: any) {
    return this.http.get((this.API_URI) + '/H' + '/' + id);
  }

  getHarinaStock() {
    return this.http.get((this.API_URI) + '/Hstock');
  }
  // Ingredientes Untables
  getIngredientesU() {
    return this.http.get((this.API_URI) + '/IU/');
  }

  getIngredienteU(id: any) {
    return this.http.get((this.API_URI) + '/IU' + '/' + id);
  }
  // Ingredientes Complementarios
  getIngredientesC() {
    return this.http.get((this.API_URI) + '/IC/');
  }

  getIngredienteC(id: any) {
    return this.http.get((this.API_URI) + '/IC' + '/' + id);
  }

  salesComplementos(complemetos: any){
    return this.http.post((this.API_URI)+'/IC/sales', complemetos);
  }
  // Nieve
  getNieves() {
    return this.http.get((this.API_URI) + '/N/');
  }

  getNieve(id: any) {
    return this.http.get((this.API_URI) + '/N' + '/' + id);
  }
  // Precios
  getPrecios() {
    return this.http.get((this.API_URI) + '/P/');
  }


}
