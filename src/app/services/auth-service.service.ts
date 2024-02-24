import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: any | null = null ;

  constructor() {
    // Recupera el token del almacenamiento local al inicializar el servicio
    this.token = localStorage.getItem('token');
  }


  isAuthenticated(): boolean {
    this.token = localStorage.getItem('token');    
    if (this.token) {
      return true;
    }
    return false;
  }
  lang(): string{
    this.token = localStorage.getItem('token');    
    if (!this.token) {
      return 'en'
    }
    const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
    const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
    const tokenLang = decodedTokenData.lang
    return tokenLang
  }
}
