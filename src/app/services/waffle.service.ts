import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WaffleService {
  API_URI = 'https://crepas-cash-users-proyect-api.onrender.com/wafle'

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

    // Precio
    getPrecios(){
      return this.http.get((this.API_URI)+'/P/');
    }
  
    getPrecio(id: any){
      return this.http.get((this.API_URI)+'/P'+ '/'+ id);
    }

}
