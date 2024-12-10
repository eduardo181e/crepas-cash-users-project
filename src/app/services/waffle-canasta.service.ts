import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './environment';

@Injectable({
  providedIn: 'root'
})
export class WaffleCanastaService {
  API_URI = API_BASE_URL+'/waffleCanasta'
  constructor(private http: HttpClient) { }
  // Ingrediente Untable
  getIngredientesU(){
    return this.http.get((this.API_URI)+'/IU/');
  }

  getIngredienteU(id: any){
    return this.http.get((this.API_URI)+'/IU'+ '/'+ id);
  }

  // Ingrediente Complementario
  getIngredientesC(){
    return this.http.get((this.API_URI)+'/IC/');
  }

  getIngredienteC(id: any){
    return this.http.get((this.API_URI)+'/IC'+ '/'+ id);
  }

    // Nieve

    getNieves(){
      return this.http.get((this.API_URI)+'/N/');
    }

    getNieve(id: any){
      return this.http.get((this.API_URI)+'/N'+ '/'+ id);
    }

  // Decoracion
  getDecoraciones() {
    return this.http.get((this.API_URI) + '/D/');
  }

  getDecoracion(id: any) {
    return this.http.get((this.API_URI) + '/D' + '/' + id);
  }

    // Precio
    getPrecios(){
      return this.http.get((this.API_URI)+'/P/');
    }
}
