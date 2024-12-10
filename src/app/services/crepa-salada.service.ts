import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CrepaSaladaService {
  API_URI = API_BASE_URL+'/crepaSalada'
  constructor(private http: HttpClient) { }
  // Ingrediente Principal
  getIngredientesP() {
    return this.http.get((this.API_URI) + '/IP/');
  }

  getIngredienteP(id: any) {
    return this.http.get((this.API_URI) + '/IP' + '/' + id);
  }
  // Aderesos
  getAderesos() {
    return this.http.get((this.API_URI) + '/A/');
  }

  getAdereso(id: any) {
    return this.http.get((this.API_URI) + '/A' + '/' + id);
  }

    // Ingrediente Base
    getIngredientesB() {
      return this.http.get((this.API_URI) + '/IB/');
    }
  
    getIngredienteB(id: any) {
      return this.http.get((this.API_URI) + '/IB' + '/' + id);
    }
    // Aderesos Base
    getAderesosB() {
      return this.http.get((this.API_URI) + '/AB/');
    }
  
    getAderesoB(id: any) {
      return this.http.get((this.API_URI) + '/AB' + '/' + id);
    }
  // Ensalada Individula
  getEnsaladas() {
    return this.http.get((this.API_URI) + '/EI/');
  }

  getEnsalada(id: any) {
    return this.http.get((this.API_URI) + '/EI' + '/' + id);
  }
  // Botana
  getBotanas() {
    return this.http.get((this.API_URI) + '/B/');
  }

  getBotana(id: any) {
    return this.http.get((this.API_URI) + '/B' + '/' + id);
  }
  // Precio
  getPrecios() {
    return this.http.get((this.API_URI) + '/P/');
  }

  getPrecio(id: any) {
    return this.http.get((this.API_URI) + '/P' + '/' + id);
  }
}
