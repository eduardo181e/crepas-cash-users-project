import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  API_URI = API_BASE_URL+'/carrito'
  constructor(private http: HttpClient) { }

  addOrden(Orden:any) {
   return this.http.post((this.API_URI) + '/add', Orden);
  }

  viewOrdem(){
    return this.http.get((this.API_URI) + '/view');
  }

  deleteOrden(id: number){
    return this.http.delete((this.API_URI) + '/delete/' + id);
  }

  updateMesaOrden(mesa1: number){
    return this.http.put((this.API_URI) + '/update',  {mesa: mesa1});
  }

  selectOrden(id: any){
    return this.http.get((this.API_URI) + '/one/' + id);
  }

  updateOrden(id: any, updateOrden: any){
    return this.http.put((this.API_URI) + '/edit/' + id, updateOrden);
  }

  getFactura(id: any){
    return this.http.get((this.API_URI) + '/factura/'+ id);
  }

  deleteAll(){
    return this.http.delete((this.API_URI) + '/deleteAll');
  }
}
